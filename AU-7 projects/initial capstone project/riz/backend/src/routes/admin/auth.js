const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../common-middleware')
const {signup, signin, signout} = require('../../controller/admin/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated} = require('../../validators/auth');

router.post('/admin/signup', 
validateSignupRequest, 
isRequestValidated, 
signup);
router.post('/admin/signin', 
validateSigninRequest, 
isRequestValidated, 
signin);
router.post('/admin/signout', requireSignin, signout)

router.post('/admin/profile', requireSignin, (req, res) =>{
    res.status(400).send({message: "hiii, You are admin"})
})

module.exports = router;