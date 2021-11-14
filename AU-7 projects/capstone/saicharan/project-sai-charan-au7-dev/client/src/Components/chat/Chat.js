import React, { useEffect } from "react";
import "./Chat.css";
import Message from "./Message";
import SideBar from "./SideBar";

import { useParams } from "react-router-dom";


function Chat() {
  const { id } = useParams();
  
  return (
    <div className="chat">
      <div className="chat__body">
        <SideBar />
        <Message userid={id}/>
      </div>
    </div>
  );
}

export default Chat;
