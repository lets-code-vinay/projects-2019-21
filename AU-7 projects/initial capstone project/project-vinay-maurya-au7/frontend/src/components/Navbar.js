import React, { useState } from "react";
import { Link } from "react-router-dom";
import hawkerLogo from "../images/hawkerLogo.png";
import { connect } from "react-redux";
import { logOut } from "../actions/auth.actions";

const Navbar = ({ logOut, auth: { isLoggedIn } }) => {
  let [isSidebar, setSidebar] = useState(false);

  return (
    <nav className="main__nav">
      <div className="logo-wrapper">
        <Link to="/">
          <img src={hawkerLogo} alt="" />
        </Link>
      </div>

      <div className="nav-links">

        <Link to="/users" className="href__style__remove nav__link">
          Users <i className="fas fa-users"></i>
        </Link>

<Link to="/topics" className="href__style__remove nav__link">
          ToDos <i className="fas fa-list-ol"></i>
        </Link>

        <Link
          to="/login"
          className="href__style__remove nav__link"
          style={{ display: isLoggedIn ? "none" : "flex" }}
        >
          Log In
        </Link>

        <Link
          to="/register"
          className="href__style__remove nav__link"
          style={{ display: isLoggedIn ? "none" : "flex" }}
        >
          Sign Up
        </Link>

        <Link
          to="/account"
          className="href__style__remove nav__link"
          style={{ display: isLoggedIn ? "flex" : "none" }}
        >
          Account <i className="fas fa-address-card"></i>
        </Link>

        <Link
          to="/calculator"
          className="href__style__remove nav__link"
          style={{ display: isLoggedIn ? "flex" : "none" }}
        >
          Calculator <i className="fas fa-calculator"></i>
        </Link>


        <Link
          to="/dashboard"
          className="href__style__remove nav__link"
          style={{ display: isLoggedIn ? "flex" : "none" }}
        >
          Dashboard <i className="fas fa-user"></i>
        </Link>

        <Link
          to="/add-post"
          className="href__style__remove nav__link"
          style={{ display: isLoggedIn ? "flex" : "none" }}
        >
          Add ToDo <i className="fas fa-edit"></i>
        </Link>

        <Link
          to="/login"
          className="href__style__remove nav__link"
          onClick={() => logOut()}
          style={{ display: isLoggedIn ? "flex" : "none" }}
        >
          Log Out <i className="fas fa-sign-out-alt"></i>
        </Link>

        <div className="hamburger-wrapper">
          <i
            className="fas fa-bars hamburger-bar"
            onClick={() => setSidebar(true)}
          ></i>
        </div>
      </div>

      <div
        className="sidebar-wrapper"
        style={{
          transition: "width .4s ease-in-out",
          width: isSidebar ? "103vw" : "0vw",
          zIndex: isSidebar ? "3" : "1",
        }}
      >
        <div className="close-sidebar-wrapper">
          <i
            onClick={() => setSidebar(false)}
            className="fas fa-times close-sidebar-icon"
          ></i>
        </div>
        <div className="sidebar-links">
          <Link
            className="sidebar-link"
            style={{ display: isSidebar ? "block" : "none" }}
            to="/users"
            onClick={() => setSidebar(false)}
          >
            Users
          </Link>

          <Link
            className="sidebar-link"
            to="/topics"
            style={{ display: isSidebar ? "block" : "none" }}
            onClick={() => setSidebar(false)}
          >
            Topics
          </Link>

          <Link
            className="sidebar-link"
            to="/add-post"
            style={{ display: isSidebar && isLoggedIn ? "block" : "none" }}
            onClick={() => setSidebar(false)}
          >
            Add question
          </Link>

          <Link
            className="sidebar-link"
            to="/account"
            onClick={() => setSidebar(false)}
            style={{ display: isSidebar && isLoggedIn ? "block" : "none" }}
          >
            Account
          </Link>

          <Link
            className="sidebar-link"
            to="/dashboard"
            onClick={() => setSidebar(false)}
            style={{ display: isSidebar && isLoggedIn ? "block" : "none" }}
          >
            Dashboard
          </Link>

          <Link
            className="sidebar-link"
            to="/login"
            onClick={() => {
              logOut();
              setSidebar(false);
            }}
            style={{ display: isSidebar && isLoggedIn ? "block" : "none" }}
          >
            Log Out
          </Link>

          <Link
            className="sidebar-link"
            to="/login"
            onClick={() => setSidebar(false)}
            style={{ display: isSidebar && !isLoggedIn ? "block" : "none" }}
          >
            Log In
          </Link>

          <Link
            className="sidebar-link"
            to="/register"
            onClick={() => setSidebar(false)}
            style={{ display: isSidebar && !isLoggedIn ? "block" : "none" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbar);
