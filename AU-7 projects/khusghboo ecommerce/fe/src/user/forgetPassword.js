import React from 'react';
import axios from 'axios'
import { API } from '../backend';
import { Link } from 'react-router-dom'
import Img from "../img/bg3.jpg";
import Logo from "../img/logo.png";

class Forget extends React.Component {

    state = {
        email: '',
        isError: false,
        isSuccess: false,
        message: '',
        isLoading: false
    }



    handleSubmitAction = () => {
        // console.log('insode')
        this.setState({ isLoading: true, isSuccess: false, isError: false })
        axios.post(API + "/user/forgetPassword", {
            username: this.state.email
        })
            .then(res => {
                if (res.data.statusCode === '200') {
                    this.setState({ isSuccess: true, message: 'Email Has been Successfully Sent to your email id.', isLoading: false })
                } else {
                    this.setState({ isError: true, message: res.data.message, isLoading: false })
                }

            }).catch(res => {
                this.setState({ isError: true, message: 'There was a problem resetting your password. Please try again later.', isLoading: false })

            })
    }
    render() {
        return (
            <div className="row " style={{ "height": "100%", "width": "100%" }}>
                <div className="col-md-4 left right bg-light">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            <img src={Logo} className="mt-2" alt="logo" width="120px" height="50px" />
                        </Link>
                        <div className="row text-primary mt-5">

                            <div className="col-8 offset-2">
                                <h5 className="font-weight-primary">Enter Registered Email</h5>

                                <div className="form-group">
                                    <input
                                        onChange={(event) => this.setState({ email: event.target.value })}
                                        value={this.state.email}
                                        className="form-control bg-light"
                                        type="email" placeholder="Enter Your Email"
                                    />
                                </div>


                                <button
                                    onClick={() => this.handleSubmitAction()}
                                    className="btn btn-outline-dark  btn-block"
                                >
                                    Submit
                                     </button>
                                {
                                    this.state.isLoading ? <div className="d-flex justify-content-center mt-2"><div class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div></div> : null
                                }
                                {
                                    this.state.isError ?
                                        <div
                                            className="alert alert-danger mt-5"
                                            style={{ display: this.state.isError ? "" : "none" }}
                                        >
                                            {this.state.message}
                                        </div>
                                        : null
                                }
                                {
                                    this.state.isSuccess ?
                                        <div
                                            className="alert alert-success mt-5"
                                            style={{ display: this.state.isSuccess ? "" : "none" }}
                                        >
                                            {this.state.message}
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="col-md-8 text-info"
                    style={{ backgroundImage: `url(${Img})` }}
                ></div>
            </div>

        )
    }
}

export default Forget