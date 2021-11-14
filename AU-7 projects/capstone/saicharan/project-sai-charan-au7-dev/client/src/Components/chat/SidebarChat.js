import { Avatar } from "@material-ui/core";
import React, { useEffect,useState } from "react";
import "./SidebarChat.css";
import {Link} from "react-router-dom";
import authHeader from "../../Services/authHeader";
import axios from "axios"

const header = {
  "Content-Type": "application/json",
  authorization: authHeader(),
};

const URL = "https://mcsocialmedia.herokuapp.com";

function SidebarChat() {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    axios
      .get(URL + "/api/followers", {
        headers: header,
      })
      .then((res) => {
        setFriends(res.data.users.following);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
    {friends ? (friends.map((item)=>{return(
    <div className="sidebarChat" key={item._id}>
      <Avatar src={item.pic}/>
      <div className="sidebarChat__info">
        <Link to={`/chat/${item._id}`}><h2>{item.username}</h2></Link>
      </div>
    </div>
    )})):<div><h1>No friends Please find some one</h1></div>}
    </>
  );
}

export default SidebarChat;
