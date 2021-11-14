import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import './style.css';
import LeftImg from './undraw_messaging_fun_86y2 (1).svg';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing-main">
        <div className="left-main">
          <img src={LeftImg} alt="Land Pic" />
        </div>
        <div className="right-main">
          <h1>Make and Connect with Developers on <span className="span-dev"> DevConnect! </span></h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. If you cannot provide a valid href, but still need the element to resemble a link. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
          <div className="share-div">
            <Link to="/register" className="create-btn">Create an Account</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
