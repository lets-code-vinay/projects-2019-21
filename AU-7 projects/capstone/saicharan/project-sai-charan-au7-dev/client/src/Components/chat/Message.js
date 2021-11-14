import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import React,{useContext,useEffect,useState} from "react";
import "./Message.css";
import { UserContext } from "../../App";
import axios from "axios";
import authHeader from "../../Services/authHeader";
import Pusher from "pusher-js";

const URL = "https://mcsocialmedia.herokuapp.com"
const header = {
  "Content-Type": "application/json",
  authorization: authHeader(),
};

function Message({userid}) {
  const { state, dispatch } = useContext(UserContext);
  const [user, setUser] = useState('')
  const [inputMessage,setInputMessage] = useState('')
  const [messages,setMessages] = useState([])
  const receiverid = userid
  const roomid = userid 
  
  useEffect(()=>{
    axios.get(`https://mcsocialmedia.herokuapp.com/api/getuserdetails/${userid}`,{headers:header},
    ).then((res)=>{setUser(res.data.user)}).catch((err)=>{
      console.log(err)
    })
  },[userid])

  useEffect(()=>{
    const pusher = new Pusher('80dd07ddc3bea0b926ca', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (data)=> {
      setMessages([...messages,data])
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }

  },[messages])

  useEffect(()=>{
    axios.get(`https://mcsocialmedia.herokuapp.com/chat/getmessages/${roomid}`,{headers:header},
    ).then((res)=>{setMessages(res.data.messages)}).catch((err)=>{
      console.log(err)
    })
  },[userid])

  const sendMessage = async (event) => {
    event.preventDefault()
    await axios
      .post(
        URL + "/chat/new",
        {
        receiverid:receiverid,
        receivername:user.username,
        message: inputMessage },

        {
          headers: header,
        }
      )
        setInputMessage('')
  };
  
  
  return (
    <div className="message">
      <div className="message__header">
        <Avatar src={user.pic}/>
        <div className="message__headerInfo">
        <h3>{user.username}</h3>
        </div>
        <div className="message__headerRight">
          
        </div>
      </div>
      <div className="message__body">
        {messages.length?messages.map((item)=>{return(
        <p key={item._id} className={`message__message ${item.senderid === state.user.id ? "":"message_reciever"}`}>
          <span className="message__name">{item.sendername} </span>
          {item.message}
          <span className="message__timestamp">{item.createdAt}</span>
        </p>
        )}):<div>No Messages yet please Send a message</div>}
        
      </div>
      <div className="message__footer">
        <form onSubmit={sendMessage}>
          <input placeholder="Type a Message " value={inputMessage} type="text" onChange={(e)=>{setInputMessage(e.target.value)}} />
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Message;
