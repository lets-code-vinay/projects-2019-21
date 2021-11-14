import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link, Redirect } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper.js";
import { createOrder } from "./helper/orderHelper";
import { isAutheticated } from "../auth/helper";
import Base from "./Base";
import DropIn from "braintree-web-drop-in-react";

const Paymentb = () => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div style={{ "display": "flex", "justifyContent": "center" }}>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
            <h3>Please login or add something to cart</h3>
          )}
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  useEffect(() => {
    getToken(userId, token);
  }, [token, userId]);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });

          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData)
            .then((response) => {
              cartEmpty(() => {
                Redirect(`/orders/${userId}`);
              });

              setReload(!reload);
            })
            .catch((error) => {
              console.log("Error While Placing Order.");
            });
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          //  console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    let discountedPrice = 0;
    products.map((p) => {
      // console.log("product", p);
      discountedPrice = p.count * (p.price * (1 - p.discount / 100));
      amount = amount + discountedPrice;
      return amount.toFixed(2)
    });
    return amount.toFixed(2);
  };

  return (
    <Base>
      <div style={{
        "minHeight": "350px",

      }}>
        <div className="container mt-5 text-center">
          <h3>
            Your bill is : <i className="fa fa-inr"></i> {getAmount()}
          </h3>
          {showbtdropIn()}
          {info.success ? (
            <div>
              <h3 className="alert alert-success">
                Your Order Placed Successfully.
              </h3>{" "}
              <br />
              <h4>
                <Link to={`/user/orders/`}>Click Here</Link> to check your
                Orders.
              </h4>
            </div>
          ) : null}
        </div>
      </div>
    </Base >
  );
};

export default Paymentb;
