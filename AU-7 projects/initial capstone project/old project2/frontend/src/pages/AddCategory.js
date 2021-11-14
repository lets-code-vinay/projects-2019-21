import React, { useState } from "react";
import { connect } from "react-redux";
import {  clearCategory, createCategory, getCategories, getCategory } from "../actions/categories.action";
import { Link } from "react-router-dom";

const AddCategory = ({ clearCategory, createCategory, categories: { category } }) => {
  let [categoryText, setCategoryText] = useState("");
  let [categoryImage, setCategoryImage] = useState("");

  const onChange = (e) => setCategoryText(e.target.value);

  const submitData = () => {
    if (categoryText !== "" && categoryText !== null) {
      createCategory(categoryText);
    } else {
      alert("Text is empty!");
    }
    setCategoryText("");

    setTimeout(() => {
      clearCategory();
    }, 5000);
  };

  return (
    <div className="make-post-wrapper">
      { category === null ? (
        <div className="tips-wrapper">
          <p className="font__p p__size font__bold app_color_font">
            <i className="fas fa-check-circle small_margin_right"></i>
            Add Category here
          </p>
          <br />
<h1> category page</h1>
          <form>
            <textarea
              type="text"
              value={categoryText}
              onChange={(e) => onChange(e)}
            />
             <label for="img">Select image Category:</label>
              <input type="file" id="img" 
                value={categoryImage} 
                name="img" ></input>
            <div
              onClick={() => submitData()}
              className="app_color_background add-post-button font__p font__bold"
            >
              Add Category
            </div>
          </form>
        </div>
      ) : (
        <div className="output">
          <div className="output-header">
            <p className="font__bold font__p app_color_font">Category ADDED</p>
          </div>
          <div className="output-buttons-wrapper">
            <div className="output-buttons">
              <div onClick={() => clearCategory()}>
                <p className="p__size font__p">Add New Category</p>
              </div>
              <div className="view-comment output-button app_color_background">
                <Link
                  to="/topics"
                  className="white__color__font"
                  style={{ textDecoration: "none" }}
                >
                  <p className="p__size font__p">View categories</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
{/* ------------------------

const categories = ({ getCategories, searchByUsername, auth }) => {
  useEffect(() => {
    getUsers();
  }, []);


<div className=" categoryList">
<header className="users-header">
  <p className="app_color_font font__bold font__p users-headline">
    Users
  </p>
  <br />

  <form className="search-user-wrapper">
    <textarea
      type="text"
      onChange={(e) => onChange(e)}
      value={searchedUsername}
    />
    <div
      className="user-search-button app_color_background font__p font__bold"
      onClick={() => searchForUser()}
    >
      Search for user
    </div>
  </form>
</header>

<div className="users-wrapper">
  <UsersWrapper users={auth.users} key={auth._id} />
</div>
</div>
---------------------------------*/}
const mapStateToProps = (state) => ({
  auth: state.auth,
  categories: state.categories,
});

const mapDispatchToProps = {
  createCategory,
  clearCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
