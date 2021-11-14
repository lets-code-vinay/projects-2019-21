const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

const user = require('./routes/user');
const books = require('./routes/books');


/// admin_user50
// 2JxNOpCwipKCRnyB
// mongodb+srv://admin_user50:2JxNOpCwipKCRnyB@cluster0-qky40.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect(config.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users',user);
app.use('/api/books',books);

app.use(express.static('client/build'));


// if(process.env.NODE_ENV === 'production'){
//     const path = require('path');
//     app.get('/*',(req,res)=>{
//         console.log('Works');
//         res.sendFile(path.resolve(__dirname,'../client','build','index.html'));
//     })
// }

//------------------------
// serve static assets if in production (heroku configuration)
if (process.env.NODE_ENV !== "production") require("dotenv").config();

if (process.env.NODE_ENV == "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//-------------------------

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log('SERVER RUNNING');
});