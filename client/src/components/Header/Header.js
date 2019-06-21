import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './../../assets/grootlogo.png';
const useStyles = makeStyles(theme => ({
  rightAligned: {
    position: 'absolute',
    right: theme.spacing(2)
  },
  spacing: {
    right: theme.spacing(2)
  },
  marginBottom: {
    marginBottom: '20px'
  }
}));

function Header({ name = '', children, className = '', ...rest }) {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      className={`${classes.marginBottom} ${className}`}
      {...rest}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {name}
        </Typography>
        <img width="150px" alt="Groot" src={logo} />
        <div className={classes.rightAligned}>{children}</div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
