import React, { useContext } from "react";
import Header from "./header/Header";
import Feed from "./posts/Feed";
import SideBar from "./sidebar/SideBar";

import { UserContext } from "../App";
import LoignSignup from "./loginSignup/LoginSignup";

function Body() {
  const { state, dispatch } = useContext(UserContext);
  return (
    <div>
      <div
        className="w3-container w3-content"
        style={{ maxWidth: "1400px", marginTop: "80px" }}
      >
        <div className="w3-row">
          <SideBar />
          <Feed />
        </div>
      </div>
    </div>
  );
}

export default Body;
