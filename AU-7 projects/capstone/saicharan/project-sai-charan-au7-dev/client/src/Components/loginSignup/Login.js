import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import AuthService from "../../Services/authService";
import { useHistory } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}; /*
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
};*/

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
function Login() {
  const form = useRef();
  const checkBtn = useRef();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();
    const result = await AuthService.login(username, password);
    const user = await AuthService.getCurrentUser();

    if (checkBtn.current.context._errors.length === 0 && result.user && user) {
      history.push("/feed");
      window.location.replace("/feed");
    } else {
      setLoading(false);
      setMessage(result.data.error);
    }
  };
  return (
    <>
      <Form onSubmit={handleLogin} ref={form}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <div className="inputclass">
          <Input
            type="text"
            placeholder="User Name / Email"
            name="username"
            value={username}
            onChange={onChangeUsername}
            validations={[required]}
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
        <Link to={"/forgot"}>Forgot your password?</Link>
        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Sign In</span>
          </button>
        </div>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </>
  );
}

export default Login;
