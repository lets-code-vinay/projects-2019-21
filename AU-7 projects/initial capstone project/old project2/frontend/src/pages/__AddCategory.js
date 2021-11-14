import React, { useState } from "react";
import Base from "../core/Base";
//import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {  clearCategory, createCategory, getCategories, getCategory } from "../actions/categories.action";
//import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

//  const { user, token } = isAutheticated();

//   // const goBack = () => (
//   //   <div className="mt-5">
//   //     <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
//   //       Admin Home
//   //     </Link>
//   //   </div>
//   // );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (
    <div className="container" style={{ minHeight: "350px" }} >
      <h3 className="mt-5">
        <span>
          <Link to="/admin/dashboard" className="text-dark">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </Link>
        </span>
        &nbsp; ADD Category
      </h3>
      <hr style={{ borderBottom: " 1px solid black" }} />
      <form className="bg-light p-5">
        <div className="form-group">
          <p className="lead ">Enter the category</p>
          <input
            type="text"
            className="form-control my-3 mt-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-dark mt-3">
            Create Category
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new product"
      className="container bg-light p-4"
    >
      <div className="bg-white rounded">
        <div className="col-md-8 offset-md-2 mt-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {/* {goBack()} */}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
