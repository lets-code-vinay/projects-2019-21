const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');


mongoose.connect('mongodb+srv://vinuadmin:vinu123@cluster0-lxhhh.mongodb.net/assW17D3?retryWrites=true&w=majority')
    .then(()=> console.log('---MongoDB connected Successfully'))
    .catch(err => console.error('----Not connected to MongoDB'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json());
app.use('/api/users',users)
app.use('/api/auth',auth)

//Server listening
const port = process.env.PORT|| 1212;
app.listen(port, ()=> console.log(`---This is port: ${port}`))