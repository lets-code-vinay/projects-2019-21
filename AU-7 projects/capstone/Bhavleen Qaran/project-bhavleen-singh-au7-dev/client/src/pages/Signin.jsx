import React, { Fragment, useState } from "react";
import MuiInput from "../components/MuiInput";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { connect } from "react-redux";
import LoginImage from "../images/login.png";
import { setUserLogin } from "../redux/actions/authActions";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "50%",
    margin: "5% auto 0px auto",
    padding: theme.spacing(4),
    textAlign: "center",
  },
  formBottom: {
    width: "50%",
    margin: "10px auto",
    padding: theme.spacing(4),
    textAlign: "center",
  },
  mb: {
    marginBottom: theme.spacing(4),
  },
}));

const Signin = ({
  setUser,
  error,
  user,
  removeLoginError,
  isAuth,
}) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "whoisnegi07@gmail.com",
    password: "1234567",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});
  const { email, password, showPassword } = values;

  const handleChange = (name) => (event) => {
    validate({ [name]: event.target.value });

    setValues({ ...values, [name]: event.target.value });
  };

  // Show Password Text
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // Validations
  const validate = (values) => {
    let temp = { ...errors };

    if ("email" in values)
      temp.email = /[\D\d*]{4}@[\D]{4}.[\D]{3}/.test(email)
        ? ""
        : "Email Address is not Valid.";

    if ("password" in values)
      temp.password =
        password.length > 5
          ? ""
          : "Minimum 6 characters are required.";

    setErrors({ ...temp });

    if (values)
      return Object.values(temp).every((x) => x === "");
  };

  // Button Submit Event
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });
    setUser({ email, password });
  };

  if (error) {
    toast.error(error);
    removeLoginError();
  }

  const loginForm = () => (
    <Paper className={classes.form} elevation={3}>
      <h1 className="logo">PicHub</h1>
      <form autoComplete="off">
        <MuiInput
          label="Email Address"
          name="email"
          type="email"
          className={classes.mb}
          value={email}
          onChange={handleChange("email")}
          error={errors.email}
        />
        <MuiInput
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          className={classes.mb}
          value={password}
          onChange={handleChange("password")}
          error={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={handleClickShowPassword}
                >
                  {values.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.mb}
          onClick={handleSubmit}
        >
          Log In
        </Button>
        <Link className="link" to="/forget-password">
          Forgot Password?
        </Link>
      </form>
    </Paper>
  );

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{
          minHeight: "90vh",
        }}
      >
        <Grid item xs={12} md={6}>
          {loginForm()}
          <Paper
            className={classes.formBottom}
            variant="outlined"
          >
            Don't have an account?{" "}
            <Link className="link" to="/signup">
              Sign Up
            </Link>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          className="bg"
          style={{
            minHeight: "90vh",
          }}
        >
          <img
            src={LoginImage}
            alt="loginsvg"
            className="thumbImage"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUserLogin(user)),
    removeLoginError: () =>
      dispatch({ type: "UNSET_LOGIN_ERROR" }),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.userRoot.isAuthenticated,
    error: state.userRoot.error,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
