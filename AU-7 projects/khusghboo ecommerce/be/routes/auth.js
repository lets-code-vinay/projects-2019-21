const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')




router.post("/signup", [
  check('name', "name should be atleast 3 char").isLength({ min: 3 }),
  check('email', "Please provide correct email").isEmail(),
  check('password', "password should be atleast 3 char").isLength({ min: 3 })
],
  signup)



router.get("/signout", signout)

router.post("/signin",
  [
    check('email', "Please provide correct email").isEmail(),
    check('password', "password should be atleast 3 char").isLength({ min: 3 })
  ], signin)


module.exports = router
