import { Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../../App";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { Link } from "react-router-dom";

function SideBar() {
  const { state, dispatch } = useContext(UserContext);
  console.log(state);
  return (
    <div className="w3-col m3">
      <div className="w3-card w3-round w3-white">
        <div className="w3-container">
          <h4 className="w3-center">My Profile</h4>
          <Link to={`/profile/${state ? state.user._id : ""}`}>
            <p></p>
            <p className="w3-center">
              <img
                src={state ? state.user.pic : ""}
                className="w3-circle"
                style={{ height: "106px", width: "106px" }}
                alt="Avatar"
              />
            </p>
          </Link>
          <hr style={{ borderWidth: "5px", color: "black" }} />

          <Link to={`/profile/${state ? state.user._id : ""}`}>
            <p>
              <i className="fa fa-at fa-fw w3-margin-right w3-text-theme"></i>{" "}
              {state ? state.user.username : ""}
            </p>
          </Link>

          <Link to={`/friends/${state ? state.user._id : ""}`}>
            <p>
              <i className="fa fa-user fa-fw w3-margin-right w3-text-theme"></i>{" "}
              {state ? state.user.following.length : ""}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
