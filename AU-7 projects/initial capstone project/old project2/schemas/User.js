const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true,
    min:3,
    max:40
  },
  lastName: {
    type: String,
    required: true,
    trim:true,
    min:3,
    max:40
  },
  userName: {
    type: Number,
    required: false,
    unique: true,
    trim:true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim:true,
    min:3,
    max:40,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim:true,
    index: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
    min:0000000000,
    max:9999999999,
  },
  address: {
    type: String,
    required: false,
    min:20,
  },
  pincode: {
    type: Number,
    required: true,
    min:000000,
    max:999999,
  },
  sellerType: {
    type: String,
    required: false,
  },
  isAdmin:{
    type:Boolean
  },
  isCustomer:{
    type:Boolean
  },
  isRestricted:{
    type:Boolean
  },
  avatar: {
    type: String,
  },
}, {timestamps: true});


module.exports = UserSchema = mongoose.model("user", UserSchema);




