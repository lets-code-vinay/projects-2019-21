const _ = require('lodash');  //for shortening
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email}); // finding the existing user
    if(user) return res.status(400).send('User Email is already registered- bad request');


    let username = await User.findOne({username:req.body.username}); // finding the existing user with username
    if(username) return res.status(400).send('User Name is already existed, try another username- bad request');

    // user = new User({
    //     name: req.body.name,
    //     username:req.body.username,
    //     email:req.body.email,
    //     password: req.body.password
    // });
    // shortening will be done here using Lodash( _ )
    user = new User(_.pick(req.body, ['name','username', 'email', 'password', 'group[]']));

    //Hashing the password
    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(user.password, salt);  //hashed password is assigning in user.password

    await user.save();  //saving the user in db

    res.send(user) // to view the user
//To see user details which is saving in db
    // res.send({
    //     name:user.name,
    //     username: user.username,
    //     email: user.email
    // })
// lodash will use here to shortened above codes
    res.send(_.pick(user,['_id','username', 'name','email','group[]']))

console.log(user);
});

module.exports = router;