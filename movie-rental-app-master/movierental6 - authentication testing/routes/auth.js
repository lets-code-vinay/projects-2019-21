const bcrypt = require('bcrypt');
const Joi = require('joi')
const _ = require('lodash');
const {User} = require('../models/user'); //remove  validate and create another validate
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email:req.body.email}); 
    if(!user) return res.status(400).send('Invalid Email password- bad request'); 

    //bcrypt.compare(req.body.password, user.password)...used to compare two 
    //like here comparing password from body req and user saved password
   const validPassword = bcrypt.compare(req.body.password, user.password )
    if(!validPassword) return res.status(400).send('Invalid email or password..')

    res.send(true);
    //console.log(validPassword)
});

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }
module.exports = router;