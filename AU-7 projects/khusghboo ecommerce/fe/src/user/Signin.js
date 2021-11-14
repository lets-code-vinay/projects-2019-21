import React, { useState } from "react";
import Logo from "../img/logo.png";
import "../styles.css";
import { Link } from 'react-router-dom'
import { signin, authenticate, isAutheticated } from "../auth/helper";
import Img from "../img/bg3.jpg";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err, "signin request failed");
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="d-flex justify-content-center mt-2"><div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div></div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-2"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div>
        <div className="">
          <h5 className="font-weight-primary">Log In</h5>
          <form>
            <div className="form-group">
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control bg-light"
                type="email" placeholder="Enter Your Email"
              />
            </div>

            <div className="form-group">
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control bg-light"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-outline-dark  btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="row " style={{ "height": "100%", "width": "100%" }}>
      <div className="col-md-4 left right bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={Logo} className="mt-2" alt="logo" width="120px" height="50px" />
          </Link>
          <div className="row text-primary mt-5">
            <div className="col-8 offset-2">

              {loadingMessage()}
              {signInForm()}
              {errorMessage()}
              {performRedirect()}
              <div className="mt-2 text-dark">
                <div className="mt-2 text-dark"> <a href="/forget" className="text-primary">Forget Password ?</a></div>
                <div className="mt-1">
                  New User?
                  <a href="/signup" className="text-primary ml-2">
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-md-8 text-info"
        style={{ backgroundImage: `url(${Img})` }}
      ></div>
    </div>

  );
};

export default Signin;
