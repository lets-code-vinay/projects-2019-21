import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
      //  console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {

    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        //console.log(data.error);
      } else {
        preload();
      }
    });
  };


  return (
    <Base title="Welcome admin" description="Manage products here">



      <div className="container">
        <h3 className="mt-5">
          <span>
            <Link to="/admin/dashboard" className="text-dark">
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </Link>
          </span>
          &nbsp; Manage Product
        </h3>
        <hr style={{ borderBottom: " 1px solid black" }} />
        <div className="row">
          <div className="col-12" style={{ "height": "500px", "overflowY": "auto" }}>
            <table className="table" >
              <thead className="thead">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img alt="products"
                          style={{ height: "50px", width: "40px" }}
                          src={product.photo}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>{product.category.name}</td>
                      <td>{product.stock}</td>

                      <td>
                        <Link to={`/admin/product/update/${product._id}`}>
                          <i className="fa fa-pencil"></i>
                        </Link>
                      </td>
                      <td>
                        <i
                          className="fa fa-trash-o" data-toggle="modal" data-target={`#p-${product._id}`}>

                        </i>
                        <div className="modal fade" id={`p-${product._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete Product {product.name} </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                Are you Sure ?
            </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {
                                  deleteThisProduct(product._id);
                                }}>Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Base>
  );
};

export default ManageProducts;
