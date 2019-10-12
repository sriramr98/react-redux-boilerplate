import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import makeStyles from '@material-ui/styles/makeStyles';
import {useDispatch, useSelector} from 'react-redux';

import {setUser} from 'containers/App/actions';
import ErrorMessage from 'components/Common/ErrorMessage';
import useForm from 'hooks/useForm';
import {signInValidator, signUpValidator} from 'utils/validators';
import {registerUser, loginUser} from 'utils/firebase';
import './css/authDialog.css';

const useStyles = makeStyles({
  dialogContentRoot: {
    padding: 0,
    marginTop: 0,
    '&:first-child': {
      paddingTop: 0,
    },
  },
  form: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  signUpButton: {
    margin: '16px 0',
  },
  forgotPassword: {
    cursor: 'pointer',
  },
  input: {
    marginBottom: '8px',
  },
});

const AuthDialog = ({open, handleClose}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [showRight, setShowRight] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authOnProcess, setAuthOnProcess] = useState(false);
  const [authError, setAuthError] = useState(null);
  const {
    values: signInValues,
    errors: signInErrors,
    handleInputChange: handleSignInInputChange,
    handleSubmit: handleSignInSubmit,
  } = useForm({
    initialState: {
      email: '',
      password: '',
    },
    validationSchema: signInValidator,
    onSubmit: onSignInSubmitted,
  });
  const {
    values: signUpValues,
    errors: signUpErrors,
    handleInputChange: handleSignUpInputChange,
    handleSubmit: handleSignUpSubmit,
  } = useForm({
    initialState: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpValidator,
    onSubmit: onSignUpSubmitted,
  });

  const currentUser = useSelector(state => state.app.currentUser);

  async function onSignInSubmitted({email, password}) {
    setAuthOnProcess(true);
    try {
      const user = await loginUser(email, password);
      setAuthOnProcess(false);
      dispatch(setUser(user));
    } catch (err) {
      setAuthOnProcess(false);
      setAuthError({
        signIn: true,
        message: err.message,
      });
    }
  }

  async function onSignUpSubmitted({email, password}) {
    setAuthOnProcess(true);
    try {
      const user = await registerUser(email, password);
      setAuthOnProcess(false);
      dispatch(setUser(user));
    } catch (err) {
      setAuthOnProcess(false);
      setAuthError({
        register: true,
        message: err.message,
      });
    }
  }

  const passwordFieldEndAdornment = (
    <InputAdornment position="end">
      <IconButton
        edge="end"
        aria-label="toggle password visibility"
        onClick={togglePasswordState}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  function togglePanel() {
    setShowRight(!showRight);
  }
  function togglePasswordState() {
    setShowPassword(!showPassword);
  }

  return (
    <Dialog maxWidth="md" open={open && !currentUser} onClose={handleClose}>
      <DialogContent classes={{root: styles.dialogContentRoot}}>
        <Box>
          {authOnProcess && <LinearProgress color="secondary" />}
          <div
            className={`container ${showRight ? 'right-panel-active' : ''}`}
            id="container"
          >
            <div className="form-container sign-up-container">
              <form className={styles.form} action="#" autoComplete="off">
                <Typography variant="h6">Create Account</Typography>
                <Box
                  mb={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                  width="50%"
                >
                  <IconButton>
                    <Icon className="fab fa-github" />
                  </IconButton>
                  <IconButton>
                    <Icon className="fab fa-google-plus-g" />
                  </IconButton>
                  <IconButton>
                    <Icon className="fab fa-linkedin-in" />
                  </IconButton>
                </Box>
                <Typography>or use your email for registration</Typography>
                {authError && authError.register && (
                  <ErrorMessage message={authError.message} />
                )}
                <TextField
                  fullWidth
                  label="Name"
                  value={signUpValues.name}
                  name="name"
                  disabled={authOnProcess}
                  onChange={handleSignUpInputChange}
                  error={signUpErrors.name}
                  helperText={signUpErrors && signUpErrors.name && signUpErrors.message}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  disabled={authOnProcess}
                  value={signUpValues.email}
                  error={signUpErrors.email}
                  helperText={signUpErrors && signUpErrors.email && signUpErrors.message}
                  onChange={handleSignUpInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  name="password"
                  margin="normal"
                  id="password"
                  variant="outlined"
                  disabled={authOnProcess}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={signUpValues.password}
                  error={signUpErrors.password}
                  helperText={
                    signUpErrors && signUpErrors.password && signUpErrors.message
                  }
                  onChange={handleSignUpInputChange}
                  InputProps={{
                    endAdornment: passwordFieldEndAdornment,
                  }}
                />
                <Button
                  disabled={authOnProcess}
                  onClick={handleSignUpSubmit}
                  type="submit"
                  className={styles.signUpButton}
                  variant="contained"
                  color="primary"
                >
                  Sign up
                </Button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form className={styles.form} action="#">
                <Typography variant="h6">Sign in</Typography>
                <Box
                  mb={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                  width="50%"
                >
                  <IconButton>
                    <Icon className="fab fa-github" />
                  </IconButton>
                  <IconButton>
                    <Icon className="fab fa-google-plus-g" />
                  </IconButton>
                  <IconButton>
                    <Icon className="fab fa-linkedin-in" />
                  </IconButton>
                </Box>
                <Typography>or use your account</Typography>
                {authError && authError.signIn && (
                  <ErrorMessage message={authError.message} />
                )}
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  disabled={authOnProcess}
                  name="email"
                  value={signInValues.email}
                  error={signInErrors.email}
                  helperText={signInErrors && signInErrors.email && signInErrors.message}
                  onChange={handleSignInInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  id="password"
                  margin="normal"
                  disabled={authOnProcess}
                  name="password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  error={signInErrors.password}
                  helperText={
                    signInErrors && signInErrors.password && signInErrors.message
                  }
                  label="Password"
                  value={signInValues.password}
                  onChange={handleSignInInputChange}
                  InputProps={{
                    endAdornment: passwordFieldEndAdornment,
                  }}
                />
                <Typography
                  variant="caption"
                  display="block"
                  className={styles.forgotPassword}
                >
                  Forgot your password?
                </Typography>
                <br />
                <Button
                  disabled={authOnProcess}
                  onClick={handleSignInSubmit}
                  variant="contained"
                  color="primary"
                >
                  Sign in
                </Button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <Button
                    disabled={authOnProcess}
                    variant="contained"
                    className="ghost"
                    onClick={togglePanel}
                  >
                    Sign In
                  </Button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <Button
                    disabled={authOnProcess}
                    variant="contained"
                    className="ghost"
                    id="signUp"
                    onClick={togglePanel}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

AuthDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AuthDialog;
