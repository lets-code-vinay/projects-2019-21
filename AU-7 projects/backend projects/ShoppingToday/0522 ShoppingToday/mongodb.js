const mongoose = require('mongoose');
const dotenv = require('dotenv').config()



//mongodb = mongoose.connect('process.env.MONGODB')
mongodb=mongoose.connect('mongodb+srv://vinuadmin:vinu123@cluster0-lxhhh.mongodb.net/Shopping?retryWrites=true&w=majority')
.then(()=> console.log('____Connected successfully to DB'))
.catch(err => console.log(err.message +'___Error occured'));



module.exports = mongodb