import React, { Component } from "react";
import { forgotPassword } from "../auth";

class ForgotPassword extends Component {
  state = {
    email: "",
    message: "",
    error: "",
  };

  forgotPassword = (e) => {
    e.preventDefault();
    this.setState({ message: "", error: "" });
    forgotPassword(this.state.email).then((data) => {
      if (data.error) {
        console.log(data.error);
        this.setState({ error: data.error });
      } else {
        console.log(data.message);
        this.setState({ message: data.message });
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="card mt-5">
          <div className="card-header bg-primary text-white text-center">
            <h2 className="">Ask for Password Reset</h2>
          </div>
          <div className="card-body">
            {this.state.message && (
              <p className="text-success text-white">{this.state.message}</p>
            )}
            {this.state.error && (
              <p className="text-warning">{this.state.error}</p>
            )}

            <form>
              <div className="form-group mt-5">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email address"
                  value={this.state.email}
                  name="email"
                  onChange={(e) =>
                    this.setState({
                      email: e.target.value,
                      message: "",
                      error: "",
                    })
                  }
                  autoFocus
                />
              </div>
              <button
                onClick={this.forgotPassword}
                className="btn btn-block btn-primary"
              >
                Send Password Rest Link
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
