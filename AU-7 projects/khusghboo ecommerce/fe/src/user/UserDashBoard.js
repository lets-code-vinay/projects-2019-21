import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const {
    user: { name, email },
  } = isAutheticated();

  const userLeftSide = () => {
    return (
      <div className="">
        <h4 className=" card-header bg-light text-dark">User Setting</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/user/updateProfile" className="nav-link text-dark">
              Update Profile &nbsp;<i class="fa fa-user" aria-hidden="true"></i>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/orders" className="nav-link text-dark">
              Your Orders &nbsp;{" "}
              <i class="fa fa-shopping-basket" aria-hidden="true"></i>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userRightSide = () => {
    return (
      <div className=" mb-4 ">
        <h4 className="card-header bg-light text-dark">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-dark mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-dark mr-2">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">User Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base className="container bg-light p-4">
      <div className="container" style={{ minHeight: "350px" }}>
        <h3 className="mt-5">
          <span>
            <Link to="/" className="text-dark">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </Link>
          </span>
          &nbsp; User Dashboard
        </h3>
        <hr style={{ borderBottom: " 1px solid black" }} />
        <div className="row">
          <div className="col-3">{userLeftSide()}</div>
          <div className="col-9">{userRightSide()}</div>
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
