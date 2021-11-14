import React from 'react';
import axios from 'axios'
import { API } from '../backend'
import { Link } from 'react-router-dom'
import Img from "../img/bg3.jpg";
import Logo from "../img/logo.png";

class ResetPassword extends React.Component {

    state = {
        newPassowrd: '',
        confirmPassword: '',
        isMatch: true,
        isError: false,
        message: '',
        isSuccess: false,
        tokenExpire: false
    }
    componentDidMount() {
        const token = this.props.match.params.token
        axios.get(`${API}/user/reset/${token}`)
            .then(res => {
                //console.log('response', res)
                if (res.data.statusCode === '200') {

                } else {
                    this.setState({ isError: true, message: 'Token Expired. please try again.' })
                }
            })
            .catch()
    }
    handleSubmitAction = () => {

        if (this.state.newPassowrd !== this.state.confirmPassword) {
            this.setState({ isError: true, message: 'New Password and Confirm Password does not match.' })
            return
        }
        this.setState({ isLoading: true, isSuccess: false, isError: false })
        const token = this.props.match.params.token
        axios.post(API + '/user/reset/' + token, {
            password: this.state.newPassowrd
        })
            .then(res => {
                // console.log('resp', res)
                if (res.data.statusCode === '201') {
                    this.setState({ isSuccess: true, isLoading: false, message: 'Your Password Successfully Changed.' })
                } else {
                    this.setState({ isError: true, message: 'We Could not reset your password. Try again After Some time.', isLoading: false })
                }
            }).catch(res => {
                this.setState({ isError: true, message: 'We Could not reset your password. Try again After Some time.', isLoading: false })

            })
    }

    render() {

        if (this.state.tokenExpire) {
            return (
                <div>
                    <p>Token has expired. Please click <a href="/signin">Here</a> and Try again.</p>

                </div>
            )
        }
        return (
            <div className="row " style={{ "height": "100%", "width": "100%" }}>
                <div className="col-md-4 left right bg-light">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            <img src={Logo} className="mt-2" alt="logo" width="120px" height="50px" />
                        </Link>
                        <div className="row text-primary mt-5">
                            <div className="col-8 offset-2">
                                <div className="form-group">

                                    <input onChange={(event) => this.setState({ newPassowrd: event.target.value })} type="password" placeholder="Enter your New password"
                                        className="form-control bg-light mb-2"
                                    />
                                    <input className="form-control bg-light mb-2 "
                                        onChange={(event) => this.setState({ confirmPassword: event.target.value })}
                                        type="password" placeholder="Rewrite New Password" />

                                    <button onClick={() => this.handleSubmitAction()} style={{ "marginTop": "10px" }} type="submit" className="btn btn-outline-dark  btn-block">
                                        Submit
                             </button>

                                </div>

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
                                        <div> <div
                                            className="alert alert-success mt-5"
                                            style={{ display: this.state.isSuccess ? "" : "none" }}
                                        >
                                            {this.state.message}
                                        </div>
                                            <p className="label" style={{ "fontSize": "medium", "marginTop": "10px" }}><Link to="/signin">Click here to Login !</Link></p> </div>
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
            </div >


        )
    }
}







export default ResetPassword




