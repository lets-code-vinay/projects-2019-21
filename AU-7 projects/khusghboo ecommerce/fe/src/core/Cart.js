import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const size = ['S', 'M', 'L']
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);


  const loadAllProducts = (products) => {
    return (
      <div className="filterProduct">
        {products.map((product, index) => (
          <div className="cartProducts">
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
            <div style={{ "display": "flex", "justifyContent": "space-around" }}>
              <p className="m-2"><label>Quantity :</label>{" " + product.count}</p>
              <p className="m-2"><label>Size :</label>{" " + product.size}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getAmount = () => {
    let amount = 0;
    let discountedPrice = 0;
    products.map((p) => {
      //  console.log("product", p);
      discountedPrice = p.count * (p.price * (1 - p.discount / 100))
      amount = amount + discountedPrice
      return 1
    });
    return amount.toFixed(2);
  };

  return (
    <Base>
      <div style={{ display: "flex", minHeight: "350px" }}>
        <div>
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
              <h4>No products</h4>
            )}
        </div>
        <div className="mt-5 mb-5 ml-4">
          <h3>
            Your Cart amount is: <i className="fa fa-inr"></i> {getAmount()}
          </h3>
          <Link to="/user/address" style={{ "display": "flex", "justify-content": "center" }}>
            <button className="btn btn-outline-success" >Proceed to Buy</button>
          </Link>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
