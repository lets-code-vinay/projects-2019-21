const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email:req.body.email}); //finding by email
    if(user) return res.status(400).send('User already registered- bad request');

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
user = new User(_.pick(req.body, ['name', 'email', 'password']));
   //hashing password here
    const salt = await bcrypt.genSalt(10); // .genSalt() is salt
    user.password = await bcrypt.hash(user.password, salt);
// user.password- input, await-> for response, user.password- without quotes
    await user.save();

   // res.send(user);
   //Lodash
    //res.send({   //things we need in return
//        name: user.name,
//         email: user.email
//    });

res.send(_.pick(user,['_id','name','email']))
   
    console.log(user);

});

module.exports = router;