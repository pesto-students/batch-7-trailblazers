import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormInput } from '../../customHooks';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signUp: {
    margin: theme.spacing(1)
  }
}));

const FullLengthOutlinedTextField = (props) => (
  <TextField variant="outlined" margin="normal" required fullWidth {...props} />
);

const Login = () => {
  const classes = useStyles();

  const email = useFormInput('');
  const password = useFormInput('');

  const handleFormSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'vikalp@gmail.com',
        password: '123'
      }),
      credential: 'include'
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <FullLengthOutlinedTextField
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...email}
          />
          <FullLengthOutlinedTextField
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            {...password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            className={classes.submit}
          >
            Log In
          </Button>

          <Box textAlign="left">
            <span>Or</span>
            <Link href="#" variant="body2" className={classes.signUp}>
              {'Sign Up'}
            </Link>
          </Box>
        </form>
      </div>
    </Container>
  );
};

export default Login;
