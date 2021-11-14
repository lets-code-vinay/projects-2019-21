//user email and password validation

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {User} = require('../models/user');
const mongoose = require('mongoose');


//--Get route
router.get('/list', async(req, res)=>{
    const users = await User.find().sort('name');
    res.send(users);
    console.log('--All users are here--')
    console.log(users)
})

//--post route
 router.post('/', async (req, res)=>{
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const user = new User({ email: req.body.email});
     if(!user) return res.status(400).send('Invalid Email or password- bad request');

     //comparing hashed passwords
     const validPassword = bcrypt.compare(req.body.password, user.password);
     if(!validPassword) return res.status(400).send('Invalid email or password- bad request');

     res.send(true)
 });
//--PUT route-- not working properly
 router.put('/:id', async(req, res)=>{
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);
     
     const user = await User.findByIdAndUpdate(req.params.id, {
         name: req.body.name,
         username: req.body.username
     }, {new: true}) 

     if(!user) return res.status(404).send('The user with given id was not found');
     res.send(user);
     console.log(user)

 })
//------
//----GET route by ID
router.get('/:id', async(req, res)=>{
    const user = await User.findById(req.params.id)

    if(!user) return res.status(404).send('The user with id not found');

    res.send(user);
    console.log(user)
})
//----DELETE route
router.delete('/:id', async(req, res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) res.status(404).send("The user is not found!!");
    res.send(user);
    console.log('The delted user is ' + user)
})


//validating here
function validate(req){
    const schema = {
        username: Joi.string().min(3).max(150).required(),
        email: Joi.string().min(3).max(150).required(),
        password: Joi.string().min(3).max(150).required()
    };
    return Joi.validate(req, schema);
}
 module.exports = router;
