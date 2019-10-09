import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/styles/makeStyles';

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
});

const AuthDialog = ({open, handleClose}) => {
  const styles = useStyles();
  const [showRight, setShowRight] = useState(false);

  const [signUpValues, setSignUpValues] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [signInValues, setSignInValues] = useState({
    email: '',
    password: '',
  });

  function handleSignUpInputChange(e) {
    setSignUpValues({
      ...signUpValues,
      [e.target.name]: e.target.value,
    });
  }

  function handleSignInInputChange(e) {
    setSignInValues({
      ...signInValues,
      [e.target.name]: e.target.value,
    });
  }

  function togglePanel() {
    setShowRight(!showRight);
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
                <h1>Create Account</h1>
                <div className="social-container">
                  <a href="#" className="social">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your email for registration</span>
                <TextField
                  fullWidth
                  label="Name"
                  value={signUpValues.name}
                  name="name"
                  onChange={handleSignUpInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={signUpValues.email}
                  onChange={handleSignUpInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  value={signUpValues.password}
                  onChange={handleSignUpInputChange}
                  variant="outlined"
                />
                <Button
                  type="submit"
                  className={styles.signUpButton}
                  variant="outlined"
                  color="primary"
                >
                  Sign up
                </Button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form className={styles.form} action="#">
                <h1>Sign in</h1>
                <div className="social-container">
                  <a href="#" className="social">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your account</span>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={signInValues.email}
                  onChange={handleSignInInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={signInValues.password}
                  onChange={handleSignInInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <a href="#" className={styles.forgotPassword}>
                  Forgot your password?
                </a>
                <Button variant="outlined" color="primary">
                  Sign in
                </Button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <Button variant="primary" className="ghost" onClick={togglePanel}>
                    Sign In
                  </Button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <Button
                    variant="primary"
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
