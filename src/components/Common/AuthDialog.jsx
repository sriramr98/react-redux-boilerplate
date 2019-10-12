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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import makeStyles from '@material-ui/styles/makeStyles';
import {useDispatch} from 'react-redux';

import {registerUser, loginUser} from 'utils/firebase';
import {setUser, clearUser} from 'containers/App/actions';
import useForm from 'hooks/useForm';
import {signInValidator, signUpValidator} from 'utils/validators';

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

  console.log({signInErrors, signUpErrors});

  function onSignInSubmitted({email, password}) {
    console.log('Sign In Submitted');
  }

  function onSignUpSubmitted({email, password}) {
    console.log('Sign Up Submitted');
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
    <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <DialogContent classes={{root: styles.dialogContentRoot}}>
        <Box>
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
                <TextField
                  fullWidth
                  label="Name"
                  value={signUpValues.name}
                  name="name"
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
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
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
                <Button onClick={handleSignInSubmit} variant="contained" color="primary">
                  Sign in
                </Button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <Button variant="contained" className="ghost" onClick={togglePanel}>
                    Sign In
                  </Button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <Button
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
