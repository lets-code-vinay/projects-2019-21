const Joi = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vinuadmin:vinu123@cluster0-lxhhh.mongodb.net/moshapp?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;