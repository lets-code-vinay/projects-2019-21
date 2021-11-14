import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const AddProduct = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
    discount: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    createdProduct,
    formData,
    discount,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    if (
      values.photo === "" ||
      values.name === "" ||
      values.description === "" ||
      values.price === "" ||
      values.category === "" ||
      values.stock === ""
    ) {
      alert("Enter All Details");
      event.preventDefault();
      return false;
    }

    event.preventDefault();

    setValues({ ...values, error: "", loading: true });
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    createaProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        // console.log("in error response");
        setValues({ ...values, error: data.error });
      } else {
        //console.log('in succes response')
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          discount: "",
          category: "",
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    //console.log(values);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form className="">
      <div className="form-group">
        <label>
          {" "}
          <span>Add photo : </span>
          <input
            className="ml-2 mt-2 border border-black rounded"
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>

      <div className="form-group">
        <input
          onChange={handleChange("discount")}
          type="number"
          className="form-control"
          placeholder="Discount"
          value={discount}
        />
      </div>

      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>

          {categories.categories &&
            categories.categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={(event) => onSubmit(event)}
        className="btn btn-success mb-3"
      >
        Add Product
      </button>
    </form>
  );

  return (
    <Base>
      <div className="container">
        <h3 className="mt-5">
          <span>
            <Link to="/admin/dashboard" className="text-dark">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </Link>
          </span>
          &nbsp; ADD Product
        </h3>
        <hr style={{ borderBottom: " 1px solid black" }} />
        <div className="row ">
          <div className="col-md-8 offset-md-2 bg-light p-4">
            {successMessage()}
            {createProductForm()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
