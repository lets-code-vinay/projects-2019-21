import Chat from "../models/chat.js";
import User from "../models/user.js";

export const newMessage = async (req,res)=>{
  const { receiverid, message, receivername} = req.body
  const senderid = req.user._id
  const sendername = req.user.username
  const id = receiverid + "_" + senderid
  const temp = id.split('_').reverse().join('_')
  if(temp!==id){
  const mes = new Chat({
    roomid:temp,
    senderid,
    receiverid,
    sendername,
    receivername,
    message,
  })
  mes.save().then((data)=>{
    return res.status(200).json({messages:data})
  }).catch((err)=>{
    return res.status(400).json({error:err})
  })}else{
    const mes = new Chat({
      roomid:id,
      senderid,
      receiverid,
      sendername,
      receivername,
      message,
    })
    mes.save().then((data)=>{
      return res.status(200).json({messages:data})
    }).catch((err)=>{
      return res.status(400).json({error:err})
    })
  }
}

export const getmessages = (req,res)=>{
  
  const id = req.params.id + "_"+ req.user._id
  const temp = id.split('_').reverse().join('_')
  if(temp!==id){
  Chat.find({roomid:temp})
  .then((messages) => {
    res.json({ messages });
  })
  .catch((err) => {
    console.log(err);
  })}
  Chat.find({roomid:id})
  .then((messages) => {
    res.json({ messages });
  })
  .catch((err) => {
    console.log(err);
  })

}