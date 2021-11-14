import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import "../styles.css";


const Card = ({
  product,
  addtoCart = false,
  removeFromCart = false,
  setReload = (f) => f,
  //   function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-dark mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card-body b-size">
      {getARedirect(redirect)}
      <Link to={{ pathname: `/product/${product._id}`, state: { product } }}>
        <img className="card-img-top" src={product.photo} alt="Card cap" />
      </Link>
      <div style={{ "textAlign": "center" }}>
        <strong className="mr-3">{cartTitle}</strong><br />

        <span className=" text-dark rounded px-4 "><strike><i className="fa fa-inr" /> {cartPrice}</strike></span>
        <span className=" text-dark rounded px-4"><i className="fa fa-inr" aria-hidden="true" /> {product.price - (product.price * product.discount) / 100}</span>

      </div>
      <div className="col-12">{showAddToCart(addtoCart)}</div>
      <div className="row">
        <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
      </div>

    </div >
  );
};

export default Card;
