import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import socketio from "socket.io";
import http from "http";
import cors from "cors";
import Pusher from "pusher";
import "dotenv/config.js";
import "./models/user.js";
import "./models/post.js";
import { router as authRouter } from "./routes/auth.js";
import { router as postRouter } from "./routes/post.js";
import { router as userRouter } from "./routes/user.js";
import { router as chatRouter } from "./routes/chat.js";
import Chat from "./models/chat.js";
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const MONGO_URL = process.env.MONGO_URL;


var pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: 'ap2',
  encrypted: true
});


app.use(cors());

//app.use(express.json());

//app.use(express.urlencoded({ extended: falsezz }));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});
mongoose.connection.on("error", () => {
  console.log("did not connect error");
});

mongoose.connection.once("open",()=>{
  const chatCollection = mongoose.connection.collection("chats");
  const changeStream = chatCollection.watch();

  changeStream.on('change',(change)=>{
    if(change.operationType === "insert"){
      const messageDetails = change.fullDocument
      pusher.trigger("messages","inserted",{
        roomid:messageDetails.roomid,
        senderid:messageDetails.senderid,
        receiverid:messageDetails.receiverid,
        message:messageDetails.message,
        sendername:messageDetails.sendername,
        receivername:messageDetails.receivername,
        createdAt:messageDetails.createdAt,
      })
    }else{
      console.log("Error trigger pusher")
    }
  })
})

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
app.use("/", authRouter);
app.use("/post", postRouter);
app.use("/api", userRouter);
app.use("/chat",chatRouter);

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    console.log(data);
    const newMessage = new Chat(data);
    newMessage.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
