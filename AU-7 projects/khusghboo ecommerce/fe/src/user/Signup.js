import React, { useState } from "react";
import Img from "../img/bg3.jpg";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { signup } from "../auth/helper";
// import "./../sign.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    error: "",
    success: false,
  });

  const { name, email, password, confirmpassword, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmpassword) {
      setValues({ ...values, error: "Password and Confirm Password does not match." });
      return
    }
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div>
        <form>
          <h5 className="font-weight-primary">Register</h5>
          <input
            type="text"
            onChange={handleChange("name")}
            value={name}
            className="form-control bg-light mt-3 text-primary"
            name="name"
            placeholder="Enter your full name"
            id="name"
            minlength="3"
            required
          />
          <input
            type="email"
            onChange={handleChange("email")}
            value={email}
            className="form-control bg-light mt-3 text-dark"
            name="email"
            placeholder="Enter your email"
            id="email"
            required
          />
          <input
            onChange={handleChange("password")}
            value={password}
            className="form-control bg-light mt-3 text-primary"
            placeholder="Enter a password"
            type="password"
            id="password"
            required
          />
          <input
            type="password"
            onChange={handleChange("confirmpassword")}
            value={confirmpassword}
            className="form-control bg-light mt-3 text-primary"
            placeholder="Confirm Password"
            id="confirm_password"
            required
          />

          <button
            className="btn btn-sm btn-dark mt-3"
            onClick={onSubmit}
            id="button"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    );
  };

  const successMessage = () => {
    return (


      <div
        className="alert alert-success mt-2"
        style={{ display: success ? "" : "none" }}
      >
        New account was created successfully. Please
        <Link to="/signin">Login Here</Link>
      </div>
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


  return (
    <div className="row" style={{ "height": "100%", "width": "100%" }}>
      <div className="col-md-4 left bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={Logo} className="mt-2" alt="logo" width="120px" height="50px" />
          </Link>
          <div className="row text-primary mt-5">
            <div className="col-9 offset-2">
              {signUpForm()}
              {errorMessage()}
              {successMessage()}

              <p className="mt-2 text-dark">
                Already a member?
                <a href="/signin" className="text-primary ml-2">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-md-8 text-info"
        style={{ backgroundImage: `url(${Img})`, "objectFit": "cover" }}
      ></div>

    </div>


  );
};

export default Signup;
