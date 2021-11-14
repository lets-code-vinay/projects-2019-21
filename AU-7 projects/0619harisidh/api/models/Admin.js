const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  jwt:{
    type: String,
    required: false
  },
  profilePicture:{
    type:String,
    required:false,
    default:null
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  isBlocked:{
    type:Boolean,
    default:false
  }
});

const AdminDetails = mongoose.model("adminDetail", AdminSchema);

module.exports = AdminDetails;