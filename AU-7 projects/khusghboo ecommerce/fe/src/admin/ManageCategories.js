import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import {
  getCategories,
  updateCategory,
  deleteCategory,
} from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState([]);

  const { user, token } = isAutheticated();
  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        // console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleEditAction = (index) => {
    const isNewEdit = [...isEdit];
    isNewEdit[index] = true;
    setIsEdit(isNewEdit);
  };
  const handleUpdateCategory = (category, index) => {
    updateCategory(user._id, token, category._id, { name: category.name }).then(
      (data) => {
        if (data.error) {
          //  console.log(data.error);
        } else {
          const isNewEdit = [...isEdit];
          isNewEdit[index] = false;
          setIsEdit(isNewEdit);
          preload();
        }
      }
    );
  };

  const handleCancelCategory = (index) => {
    const isNewEdit = [...isEdit];
    isNewEdit[index] = false;
    setIsEdit(isNewEdit);
    preload();
  };
  const handleCategoryChange = (event, index, category) => {
    const newCategory = { ...categories };
    //console.log(newCategory);
    category.name = event.target.value;
    newCategory[index] = category;
    setCategories(newCategory);
  };
  const handleDeleteCategory = (category, index) => {
    deleteCategory(user._id, token, category._id).then((data) => {
      if (data.error) {
        //console.log(data.error);
      } else {
        preload();
      }
    });
  };
  return (
    <Base title="Welcome admin" description="Manage products here">
      <div className="container" style={{ "width": "50%" }}>
        <h3 className="mt-5">
          <span>
            <Link to="/admin/dashboard" className="text-dark">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </Link>
          </span>
          &nbsp; ADD Category
        </h3>
        <hr style={{ borderBottom: " 1px solid black" }} />
        <div className="categoriesList" style={{ "height": "400px", "overflowY": "auto" }}>
          <table class="table">
            <thead class="thead">
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Categories</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.categories &&
                categories.categories.map((category, index) => {
                  return (
                    <tr key={category._id}>
                      <td>{index + 1}</td>

                      <td>
                        <input
                          style={{ border: "none" }}
                          type="text"
                          disabled={!isEdit[index]}
                          value={category.name}
                          onChange={(event) =>
                            handleCategoryChange(event, index, category)
                          }
                        />
                        {isEdit[index] ? (
                          <i
                            className="fa fa-check"
                            aria-hidden="true"
                            onClick={() =>
                              handleUpdateCategory(category, index)
                            }
                          ></i>
                        ) : null}
                        {isEdit[index] ? (
                          <i
                            className="fa fa-times"
                            aria-hidden="true"
                            onClick={() => handleCancelCategory(index)}
                          ></i>
                        ) : null}
                      </td>

                      <td>
                        <i
                          className="fa fa-pencil"
                          onClick={() => handleEditAction(index)}
                        ></i>
                      </td>
                      <td>
                        <i
                          class="fa fa-trash-o"
                          onClick={() => handleDeleteCategory(category, index)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
