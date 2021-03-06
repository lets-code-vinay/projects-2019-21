import React, { useState } from "react";
import { registerUser } from "../actions/auth.actions";
import { connect } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import {Container, Row, Col} from 'react-bootstrap';
import nariyal from '../../images/nariyal.png'
import background from '../../images/streetfood.jpg';

const RegisterPage = ({ registerUser, error }) => {
  const [hasPasswordShowed, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const { name, lastName, email, password } = userData;

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  return (
<div className="registerPage" >
  <Container fluid >
      <Row  style={{display:'flex'}}>
        <Col md={7} className="register-right"style={{backgroundColor: 'grey', marginLeft:'auto'}}> 
        <img src={nariyal} />
        </Col>

        <Col md={5} className="register-left"> 
        <main className="register-page-wrapper">    
      <form className="register-section">
        <div className="inputs-wrapper">
          <header className="register-header-wrapper">
            <p className="font__p p__size register-header">
              <i className="fas fa-users users-icon app_color_font"></i>
              Sign Up
            </p>
          </header>

          <div className="label-wrapper">
            <label className="label__register p__size">Name</label>
          </div>

          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />

          <div className="label-wrapper">
            <label className="label__register p__size">Last Name</label>
          </div>
          <input
            type="text"
            value={lastName}
            name="lastName"
            onChange={(e) => onChange(e)}
          />

          <div className="label-wrapper">
            <label className="label__register p__size">Username</label>
          </div>
          <input
            type="text"
            name="userName"
            value="00"
          />

          <div className="label-wrapper">
            <label className="label__register p__size">E-mail</label>
          </div>
          <input
            name="email"
            value={email}
            type="email"
            onChange={(e) => onChange(e)}
          />

          <div className="label-wrapper">
            <label className="label__register p__size">Password</label>
          </div>

          <input
            name="password"
            type={hasPasswordShowed ? "text" : "password"}
            value={password}
            onChange={(e) => onChange(e)}
          />

          <i
            onClick={() => setShowPassword(!hasPasswordShowed)}
            className={hasPasswordShowed ? "fas fa-eye" : "fas fa-eye-slash"}
          ></i>

          <div className="label-wrapper">
            <p className="p__size font__p password__info">
              <i className="fas fa-user-check app_color_font"></i> Password must
              have at least 6 letters
            </p>
          </div>

          {error && (error !== null || error !== "" || error !== {}) && (
            <ErrorMessage errorMessage="Something went wrong..." />
          )}

          <div
            className="button-wrapper app_color_background"
            onClick={() => registerUser(userData)}
          >
            <p className="button-letter">Sign Up</p>
          </div>
        </div>
      </form>
      </main>

         </Col>
      </Row>
    </Container >



    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.errors,
});

export default connect(mapStateToProps, { registerUser })(RegisterPage);
