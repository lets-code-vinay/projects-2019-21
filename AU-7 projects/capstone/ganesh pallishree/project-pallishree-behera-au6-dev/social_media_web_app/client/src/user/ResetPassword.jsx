import React, { Component } from "react";
import { resetPassword } from "../auth";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            message: "",
            error: ""
        };
    }

    resetPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });

        resetPassword({
            newPassword: this.state.newPassword,
            resetPasswordLink: this.props.match.params.resetPasswordToken
        }).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error, newPassword: "" });
            } else {
                console.log(data.message);
                this.setState({ message: data.message, newPassword: "" });
            }
        });
    };

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Reset your Password</h2>

                {this.state.message && (
                    <p className="text-success">{this.state.message}</p>
                )}
                {this.state.error && (
                    <p className="text-warning">{this.state.error}</p>
                )}

                <form
                    style={{ display: this.state.message.length ? "none" : "" }}
                >
                    <div className="form-group mt-5">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Your new password"
                            value={this.state.newPassword}
                            name="newPassword"
                            onChange={e =>
                                this.setState({
                                    newPassword: e.target.value,
                                    message: "",
                                    error: ""
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.resetPassword}
                        className="btn btn-raised "
                        style={{background:'#30336b', color:"white"}}
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        );
    }
}

export default ResetPassword;
