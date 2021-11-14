const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

//-----------------Signup--------------
exports.signup = (req, res) => {
  const { email } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          error: "This Email is already Registerd with us !!"
        })
      }
    })
  const user = new User(req.body)
  user.save()
    .then((user, err) => {
      if (err) {
        //console.log(err)
        return res.status(400).json({
          err: "Not able to save user in DB"
        })
      }
      res.json({
        name: user.name,
        email: user.email,
        id: user._id
      })
    })
}
//-----------------------------------------------------//


//-----------------Signout------------------------------//
exports.signout = (req, res) => {
  res.clearCookie('token')
  res.send("Signout successfully")
}
//-------------------------------------------------------//

//--------------------Signin---------------------------------//
exports.signin = (req, res) => {
  const { email, password } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "This Email is not Registerd with us !!"
        })
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email or password is not correct"
        })
      }

      //Genrate token
      const token = jwt.sign({ _id: user._id }, process.env.secret)

      //store in browser cookie
      res.cookie("token", token, { expire: new Date() + 9999 })

      //send responce to front end
      const { _id, name, email, role } = user
      return res.json({ token, user: { _id, name, email, role } })

    })
    .catch((err) => {
      return res.status(400).json({
        error: "This User is not Registerd with us !!"
      })
    })

}
//--------------------------------------------------------


//Middleware for protected route
//---------------------------------isSignedIn------------------------
exports.isSignedIn = (req, res, next) => {
  let token = req.headers.authorization
  //console.log("in is signedin", req.headers.authorization)
  token = token.split(' ')[1]
  //console.log("in is signedin", token)

  if (!token) {
    return res.status(401).send({ statusCode: "401", message: "Please Login to continue." })
  }
  var payload
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, process.env.secret)
    req.auth = {}
    req.auth._id = payload._id
    next()
  }
  catch (err) {
    // console.log(err)
    return res.status(400).send({ statusCode: "401", message: "Unauthorized Access." })
  }

}
//-----------------------------------------------------------------------------------\

//---------------------------------IsAuthenticated-----------------------------------
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied"
    })
  }
  next()
}
//---------------------------------------------------------------------------------------

//------------------------isSeller---------------------------------------
exports.isSeller = (req, res, next) => {
  //console.log("in is seller")
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not seller"
    })
  }
  next()
}
//--------------------------------------------------------------------------


//-----------------------------------end-------------------------------