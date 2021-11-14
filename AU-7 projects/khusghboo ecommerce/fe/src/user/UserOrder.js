import React from "react";
import { getUserOrder } from "../core/helper/orderHelper";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import "../styles.css";

class UserOrder extends React.Component {
  state = {
    user: "",
    token: "",
    orders: [],
  };
  componentDidMount() {
    const { user, token } = isAutheticated();

    getUserOrder(user._id, token)
      .then((orders) => {
        console.log(orders);
        this.setState({
          orders: orders,
        });
      })
      .catch((err) => {
        console.log("in error response", err);
      });
  }

  getAmount = (p) => {
    let amount = 0;
    //  console.log("product", p);
    amount = p.count * (p.price * (1 - p.discount / 100));
    return amount;
  };

  render() {
    return (
      <Base>
        <div className="container mb-5" style={{ minHeight: "350px" }}>
          <h3 className="mt-5">
            <span>
              <Link to="/user/dashboard" className="text-dark">
                <i class="fa fa-angle-left" aria-hidden="true"></i>
              </Link>
            </span>
            &nbsp; Orders History
          </h3>
          <hr style={{ borderBottom: " 1px solid black" }} />
          {this.state.orders.map((order, index) => {
            return order.products.map((products, index) => {
              return (
                <div className="card order-shadow order  mt-4">
                  <div>
                    <img alt="product"
                      className="card-img"
                      style={{ width: "200px", height: "200px" }}
                      src={products.photo}
                    ></img>
                  </div>
                  <div className="ml-3">
                    <h5 class="card-title ">
                      <strong>{products.name}</strong>
                    </h5>
                    <p class="card-text text-muted">{products.description}</p>
                    <p class="card-text">
                      <span>Price: </span>
                      <i className="fa fa-inr"> {this.getAmount(products)}</i>
                    </p>
                    <p class="card-text">
                      <span>Qty: </span>
                      {products.count}
                    </p>
                    <p class="card-text">
                      <span>Size: </span>
                      {products.size}
                    </p>
                    <p class="card-text">
                      <span>Payment Status: </span>
                      {order.status}{" "}
                      <i
                        class="fa fa-check-square-o text-success"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </Base>
    );
  }
}

export default UserOrder;
