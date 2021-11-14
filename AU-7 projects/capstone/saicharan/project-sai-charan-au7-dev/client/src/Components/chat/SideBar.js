import React, { useState, useEffect } from "react";
import "./SideBar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";


function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1>Contacts</h1>
        <div className="sidebar__headerRight"></div>
      </div>
      <hr style={{width:"50%",textAlign:"left",marginLeft:"0"}}></hr>
      <div className="sidebar__chats">
        <SidebarChat />
      </div>
    </div>
  );
}

export default SideBar;
