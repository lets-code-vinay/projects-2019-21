import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link, useHistory } from "react-router-dom";

import AuthService from "../../Services/authService";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

function Signup() {
  const form = useRef();
  const checkBtn = useRef();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeFullname = (e) => {
    const fullname = e.target.value;
    setFullname(fullname);
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    const result = await AuthService.register(
      fullname,
      username,
      email,
      password
    );
    console.log(result);
    function myFunction() {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 5000);
    }
    if (checkBtn.current.context._errors.length === 0 && result.data.email) {
      setMessage(result.data.message);
      myFunction();
      setSuccessful(true);
    } else if (result.data.error) {
      setMessage(result.data.error);
      setSuccessful(false);
    }
  };
  return (
    <>
      <Form onSubmit={handleRegister} ref={form}>
        <h1>Create Account</h1>
        <div className="social-container">
          <Link to={"#"} className="social">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to={"#"} className="social">
            <i className="fab fa-google-plus-g"></i>
          </Link>
          <Link to={"#"} className="social">
            <i className="fab fa-linkedin-in"></i>
          </Link>
        </div>
        <span>or use your email for registration</span>
        <div className="inputclass">
          <Input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={fullname}
            onChange={onChangeFullname}
            validations={[required]}
          />
        </div>
        <div className="inputclass">
          <Input
            type="text"
            placeholder="User Name"
            name="username"
            value={username}
            onChange={onChangeUsername}
            validations={[required, vusername]}
          />
        </div>
        <div className="inputclass">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            validations={[required, validEmail]}
          />
        </div>
        <div className="inputclass">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required, vpassword]}
          />
        </div>
        <button>Sign Up</button>
        {/* {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
            </div>
            )}*/}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      <div id="snackbar">{message || "Error"}</div>
    </>
  );
}

export default Signup;
