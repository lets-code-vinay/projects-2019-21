import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import DefaultProfile from "../images/avatar.jpg";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ccc" };
  else return { color: "#ffffff" };
};
const photoUrl =isAuthenticated()
? `${process.env.REACT_APP_API_URL}/user/photo/${
  isAuthenticated().user._id
  }?${new Date().getTime()}`
: DefaultProfile;

const Menu = ({ history }) => (
  
  <nav className="navbar navbar-expand-lg navbar-light " style={{background:'#30336b'}}>
    <div className="container" >
      <Link className="navbar-brand" to="/" style={isActive(history, "/")}>
      Timepass
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          

          {!isAuthenticated() && (
            <React.Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </React.Fragment>
          )}

          {isAuthenticated() && isAuthenticated().user.role === "admin" && (
            <li className="nav-item">
              <Link
                to={`/admin`}
                style={isActive(history, `/admin`)}
                className="nav-link"
              >
                Admin
              </Link>
            </li>
          )}

          {isAuthenticated() && (
            <React.Fragment>
              <li className="nav-item">
            <Link
              className={
                history.location.pathname === "/users"
                  ? "active nav-link"
                  : "not-active nav-link"
              }
              style={{color:'white'}}
              to="/users"
            >
              Users
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={`/post/create`}
              style={isActive(history, `/post/create`)}
              className="nav-link"
            >
              Create Post
            </Link>
          </li>
              <li className="nav-item">
                <Link
                  to={`/findpeople`}
                  style={isActive(history, `/findpeople`)}
                  className="nav-link"
                >
                  Find People
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={`/user/${isAuthenticated().user._id}`}
                  style={isActive(
                    history,
                    `/user/${isAuthenticated().user._id}`
                  )}
                  className="nav-link"
                >
                {/*   <img src={photoUrl} onError={i => (i.target.src = `${DefaultProfile}`)} width="50px" height="50px" style={{borderRadius:"50%"}} />  */}
                  {`${isAuthenticated().user.name}'s profile`}
                  {/* <img src={} /> */}
                </Link>
              </li>

              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#fff" }}
                  onClick={() => signout(() => history.push("/"))}
                >
                  Sign Out
                </span>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </div>
  </nav>
 
);

export default withRouter(Menu);
