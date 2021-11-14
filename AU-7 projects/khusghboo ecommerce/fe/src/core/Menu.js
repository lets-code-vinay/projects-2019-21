import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";
import Logo from "../img/logo.png";
import { loadCart } from "./helper/cartHelper";
import { getCategories } from "../admin/helper/adminapicall";
import "../styles.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#E74292" }; //, fontSize: 20
  } else {
    return { color: "#000000" };
  }
};

const Menu = ({ history }) => {
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

  const loadAllCategory = () => {
    getCategories().then((data) => {
      // console.log("inn menu", data);
      if (data.error) {
        setError(data.error);
      } else {
        setCategory(data);
      }
    });
  };

  useEffect(() => {
    loadAllCategory();
  }, []);

  return (
    <nav
      className="navbar navbar-fixed navbar-expand-lg navbar-light border-bottom"
      style={{ backgroundColor: "white" }}
    >
      <Link style={currentTab(history, "/")} className="navbar-brand" to="/">
        <img src={Logo} alt="logo" width="120px" height="50px" />
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse ml-5" id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">
          {category.categories &&
            category.categories.map((cat) => {
              return (
                <li className="nav-item active">
                  <strong>
                    <Link
                      to={`/products/all/${cat._id}/1`}
                      className="text-dark nav-link"
                      style={{ "fontSize": "20px", "marginRight": "50px" }}
                    >
                      {cat.name}
                    </Link>
                  </strong>
                </li>
              );
            })}
        </ul>

        <form className="form-inline mr-5">
          <input
            className="form-control mr-sm-2"
            aria-label="Search"
            type="search"
            onChange={(e) => setState(e.target.value)}
            placeholder="search"
          />
          <Link
            className="btn btn-outline-dark  my-2 my-sm-0"
            to={`/products/search/?q=${state}`}
          >
            Search
          </Link>
        </form>

        <ul className="navbar-nav">
          {isAutheticated() && isAutheticated().user.role === 0 && (
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="bottom"
              title="CART"
            >
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                <i class="fa fa-cart-plus" aria-hidden="true">
                  <sup className="m-1">
                    <b>{loadCart().length}</b>
                  </sup>
                </i>
              </Link>
            </li>
          )}
          {isAutheticated() && isAutheticated().user.role === 0 && (
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="bottom"
              title="DASHBOARD"
            >
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                <i class="fa fa-user-o" aria-hidden="true"></i>
              </Link>
            </li>
          )}
          {isAutheticated() && isAutheticated().user.role === 1 && (
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="bottom"
              title="DASHBOARD"
            >
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                <i class="fa fa-user-o" aria-hidden="true"></i>
              </Link>
            </li>
          )}
          {!isAutheticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
            </Fragment>
          )}
          {isAutheticated() && (
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="bottom"
              title="SIGN OUT"
            >
              <span
                className="nav-link text-dark"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                <i class="fa fa-sign-out" aria-hidden="true"></i>
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
