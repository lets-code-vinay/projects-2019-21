const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 150
    },
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 150
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 150
    },
    password:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 150
    }
  ,  group:[{
        type: String,
        minlength: 3,
        maxlength: 150
   }]
}))


//---VAlidation 
function validateUser(user){
    const schema = { 
            name : Joi.string().min(3).max(150).required(),
            username : Joi.string().min(3).max(150).required(),
            email : Joi.string().min(3).max(150).required(),
            password : Joi.string().min(3).max(150).required()
//            ,group : [Joi.string().min(3).max(150).required()],
        };
        return Joi.validate(user, schema)
}

exports.User = User;
exports.validate= validateUser;