import React from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getUser, updateUserProfile } from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper";

class Address extends React.Component {
  state = {
    address: "",
    pincode: "",
    user_id: "",
    token: "",
  };

  componentDidMount() {
    const { user, token } = isAutheticated();
    getUser(user._id, token)
      .then((user) => {
        this.setState({
          address: user.address,
          pincode: user.pincode,
          user_id: user._id,
          token: token,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (value, event) => {
    //  console.log("value", value, event.target.value);
    this.setState({
      [value]: event.target.value,
    });
  };
  handleUpdate = () => {
    if (this.state.address === "" || this.state.pincode === "") {
      alert("Enter all details");
      return;
    }
    let user = {
      address: this.state.address,
      pincode: this.state.pincode,
    };
    updateUserProfile(this.state.user_id, this.state.token, user)
      .then((res) => {
        this.setState({ isUpdated: true });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  render() {
    return (
      <Base>
        <div
          className="createProduct order-shadow"
          style={{ minHeight: "350px" }}
        >
          <h5>Shipping Address</h5>

          <div className="form-group">
            <textarea
              name="Address"
              className="form-control"
              placeholder="Address"
              onChange={(event) => this.handleChange("address", event)}
              value={this.state.address}
            />
          </div>
          <div className="form-group">
            <input
              name="pincode"
              className="form-control"
              placeholder="Pincode"
              onChange={(event) => this.handleChange("pincode", event)}
              value={this.state.pincode}
            />
          </div>
          <div className="d-flex  justify-content-end">
            {this.state.isUpdated ? (
              <div className="alert alert-success">
                Your shipping Address Updated Successfully.
              </div>
            ) : null}
            <button
              className="btn btn-success m-2 ml-5"
              onClick={() => this.handleUpdate()}
            >
              Update
            </button>
            {this.state.address && this.state.pincode ? (
              <Link to="/user/payment">
                <button className="btn btn-warning m-2">Next</button>{" "}
              </Link>
            ) : null}
          </div>
        </div>
      </Base>
    );
  }
}

export default Address;
