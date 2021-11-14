import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="">
        <h4 className="card-header bg-light text-dark">Admin Setting</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-dark">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-dark">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-dark">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-dark">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-dark">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className=" mb-4 ">
        <h4 className="card-header bg-light text-dark">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-dark mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-dark mr-2">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
      className="container bg-light p-4"
    >
      <div className="container">
        <h3 className="mt-5">
          <span>
            <Link to="/" className="text-dark">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </Link>
          </span>
          &nbsp; Admin Dashboard
        </h3>
        <hr style={{ borderBottom: " 1px solid black" }} />
        <div className="row">
          <div className="col-3">{adminLeftSide()}</div>
          <div className="col-9">{adminRightSide()}</div>
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
