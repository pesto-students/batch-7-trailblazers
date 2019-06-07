import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import MDButton from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    color: "#eeeeee",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

const Button = ({
  children = "",
  loading = false,
  success = false,
  disable = false,
  ...rest
}) => {
  const { root, wrapper, buttonProgress, buttonSuccess } = useStyles();

  const buttonClassName = success ? buttonSuccess : "";
  if (success) loading = false;

  return (
    <div className={root}>
      <div className={wrapper}>
        <MDButton
          variant="contained"
          className={buttonClassName}
          disabled={loading || disable}
          {...rest}
        >
          {success && <CheckIcon />}
          {children}
        </MDButton>
        {loading && <CircularProgress size={24} className={buttonProgress} />}
      </div>
    </div>
  );
};

export default Button;
