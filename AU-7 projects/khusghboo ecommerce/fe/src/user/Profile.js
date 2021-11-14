import React from "react";
import Base from "../core/Base";
import { updateUserProfile, getUser } from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper/index";

import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
    mobile: "",
    orders: "",
    user_id: "",
    token: "",
    isUpdated: false,
  };

  componentDidMount() {
    const { user, token } = isAutheticated();
    getUser(user._id, token)
      .then((user) => {
        //console.log(user);
        this.setState({
          name: user.name,
          email: user.email,
          address: user.address,
          pincode: user.pincode,
          mobile: user.mobile,
          user_id: user._id,
          token: token,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (value, event) => {
    //console.log("value", value, event.target.value);
    this.setState({
      [value]: event.target.value,
    });
  };
  handleUpdate = () => {
    let user = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      pincode: this.state.pincode,
      mobile: this.state.mobile,
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
        <div className="container">
          <h3 className="mt-5">
            <span>
              <Link to="/user/dashboard" className="text-dark">
                <i class="fa fa-angle-left" aria-hidden="true"></i>
              </Link>
            </span>
            &nbsp; Update Account
          </h3>
          <hr style={{ borderBottom: " 1px solid black" }} />

          <div className="bg-light text-dark p-3 ">
            {this.state.isUpdated ? (
              <div className="alert alert-success">
                Your Details Updated Successfully.
              </div>
            ) : null}
            <div className="form-group">
              <input
                name="name"
                className="form-control"
                placeholder="Name"
                onChange={(event) => this.handleChange("name", event)}
                value={this.state.name}
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                disabled
              />
            </div>

            <div className="form-group">
              <input
                name="mobile"
                className="form-control"
                placeholder="Mobile"
                onChange={(event) => this.handleChange("mobile", event)}
                value={this.state.mobile}
              />
            </div>
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
              {" "}
              <button
                className="btn btn-success m-2"
                onClick={() => this.handleUpdate()}
              >
                Update
              </button>
              <Link to="/user/dashboard">
                <button className="btn btn-danger m-2">Cancel</button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </Base>
    );
  }
}

export default UserProfile;
