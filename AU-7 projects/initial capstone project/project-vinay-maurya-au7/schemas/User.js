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
  avatar: {
    type: String,
  },
}, {timestamps: true});

UserSchema.virtual('fullName')
.get(function(){
    return `${this.name} ${this.lastName}`;
})


module.exports = UserSchema = mongoose.model("user", UserSchema);
