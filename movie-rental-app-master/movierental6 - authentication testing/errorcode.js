// //models/user.js
// // joi-password-complexity  not worked
// const Joi = require('joi');
// const PasswordComplexity = require('joi-password-complexity')
// const mongoose = require('mongoose');

// const User = mongoose.model('User', new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//       minlength: 5,
//       maxlength: 50
//     },
//     email: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 255,
//         unique: true
//       },
//       password: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 1024
//       }
//   }));
// function validateUser(user) {
//   const complexityOptions = {
//     min:6,
//     max: 30,
//     lowercase: 1,
//     uppercase:1,
//     numeric: 1,
//     symbol: 1,
//     requirementCount:4 
//   };
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(255).required(),
//   //  password: Joi.string().min(5).max(255).required(),
//     password: new PasswordComplexity(complexityOptions).required()
//   };
  
//   return Joi.validate(user, schema);
// }

// exports.User = User; 
// exports.validate = validateUser;
// //