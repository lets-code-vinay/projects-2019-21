import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
      recaptcha: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    signin(user).then(data => {
      if (data.error) {
          this.setState({ error: data.error, loading: false });
      } else {
          // authenticate
          authenticate(data, () => {
              this.setState({ redirectToReferer: true });
          });
      }
  });
  };

  render() {
    const {
      email,
      password,
      error,
      redirectToReferer,
      loading,
    } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        {/* {this.signinForm(email, password, recaptcha)} */}
        <div className="row">
          <div className="col-8 offset-2">
            <div className="card mt-5">
              <div className="card-header text-white text-center"
               style={{background:'#30336b', color:"white"}}>
                <h2>SignIn</h2>
              </div>
              <div className="card-body">
                <div
                  className="alert alert-danger"
                  style={{ display: error ? "" : "none" }}
                >
                  {error}
                </div>

                {loading ? (
                  <div className="text-center">
                    <h2>Loading...</h2>
                  </div>
                ) : (
                  ""
                )}
                <form>
                  <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                      onChange={this.handleChange("email")}
                      type="email"
                      className="form-control"
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input
                      onChange={this.handleChange("password")}
                      type="password"
                      className="form-control"
                      value={password}
                    />
                  </div>

                  <button
                    onClick={this.clickSubmit}
                    className="btn btn-block btn-primary mb-3 mt-5"
                    style={{background:'#30336b', color:"white"}}
                  >
                    Submit
                  </button>
                </form>
                <p>
                  <Link
                    to="/forgot-password"
                    className="btn btn-block btn-danger"
                  >
                    {" "}
                    Forgot Password
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
