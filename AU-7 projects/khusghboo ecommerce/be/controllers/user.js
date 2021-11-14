const User = require('../models/user')
const { Order } = require('../models/order')
const nodemailer = require("nodemailer");
const crypto = require('crypto')


exports.getUserByID = (req, res, next, id) => {
  // console.log("in get userby id")
  User.findOne({ _id: id }).exec()
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "No User Found."
        })

      }
      req.profile = user
      next()
    })
    .catch((err) => {
      return res.status(400).json({
        error: "An Error Occured while getting User from DB."
      })
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = []
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.discription,
      catagory: product.catagory,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transation_id: req.body.order.transation_id
    })
  })
  //store this in DB
  User.findOneAndUpdate({ _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true })
    .then((purchase) => {
      console.log(purchases)
      next()
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Unable to save purchase List"
      })
    })

}

exports.getUser = (req, res) => {

  req.profile.salt = undefined,
    req.profile.encry_password = undefined,
    req.profile.createdAt = undefined,
    req.profile.updatedAt = undefined
  return res.json(req.profile)
}


exports.getAllUser = (req, res) => {
  User.find().exec()
    .then((users) => {
      return res.json(users)
    })
    .catch((err) => {
      return res.status(400).json({
        error: "An Error Occured while getting All User from DB."
      })
    })
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate({ _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false })
    .then((user) => {
      user.salt = undefined,
        user.encry_password = undefined,
        user.createdAt = undefined,
        user.updatedAt = undefined
      res.json(user)
    })
    .catch((err) => {
      return res.status(400).json({
        error: "An Error Occured while update user"
      })
    })
}



exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id")
    .exec()
    .then((order) => {
      return res.json(order)
    })
    .catch((err) => {
      return res.status(400).json({
        error: "No order"
      })
    })
}




exports.forgetPassword = async (req, res) => {

  const { username } = req.body

  const userDtls = await User.findOne({ email: username }).exec()

  //Check if user already Exists
  if (!userDtls) {
    console.log('User Does nort Exits')
    res.status(206).send({ statusCode: "206", message: "Please Enter valid Email." })
    return
  }
  //Generate and Store Token
  const resetToken = crypto.randomBytes(20).toString('hex');
  const tokenExpiration = Date.now() + 3600000; //expires in an hour

  const updatedUser = await User.findOneAndUpdate({ email: username }, { $set: { resetToken: resetToken, tokenExpiration: tokenExpiration } }, { new: true, useFindAndModify: false })

  //send email
  //console.log('headers:', req.headers)
  const link = req.headers.origin + "/reset/" + resetToken
  const mailOptions = {
    to: username,
    from: process.env.FROM_EMAIL,
    subject: "Password change request",
    text: `Hi \n 
           Please click on the following link ${link} to reset your password. \n\n 
           If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  }

  const smtpTransport = nodemailer.createTransport({
    service: process.env.SERVICE || 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSOWRD
    }
  })

  try {
    const info = await smtpTransport.sendMail(mailOptions)
    //console.log('Successfully send mail', info)
    res.status(200).send({ statusCode: '200', message: 'Successfully send email' })
  } catch (err) {
    // console.log('Error in sending mail', err)
    res.status(209).send({ statusCode: '209', message: 'Error in Sending Mail.' })

  }
}

//TO check TOken is Valid or Not
exports.resetPassword = async (req, res) => {
  try {
    // console.log(req.params.token)
    const user = await User.find({ resetToken: req.params.token, tokenExpiration: { $gt: Date.now() } }).exec()
    if (user) {
      res.status('200').send({ statusCode: '200', message: 'User Token is valid.' })
    } else {
      res.status('205').send({ statusCode: '205', message: 'User Token has Expired.' })
    }
  } catch (err) {
    res.status('205').send({ statusCode: '205', message: 'User Token has Expired.' })

  }
}

exports.changePassowrd = async (req, res) => {
  try {
    const user = await User.findOne({ resetToken: req.params.token, tokenExpiration: { $gt: Date.now() } }).exec()
    if (!user) {
      res.status('205').send({ statusCode: '205', message: 'User Token has Expired.' })
      return
    }

    const username = user.email
    const password = req.body.password;

    const usrDoc = await User.findById(user._id)

    usrDoc.password = password
    usrDoc.resetToken = ''
    usrDoc.tokenExpiration = null
    const updatedUser = await usrDoc.save()

    if (updatedUser) {
      const mailOptions = {
        to: username,
        from: process.env.FROM_EMAIL,
        subject: "Password changed Successfully",
        text: `Hello,\n\n'
                - This is a confirmation that the password for your account ${username} has just been changed.\n`
      };
      const smtpTransport = nodemailer.createTransport({
        service: process.env.SERVICE || 'Gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSOWRD
        }
      })

      try {
        const info = await smtpTransport.sendMail(mailOptions)
        res.status('201').send({ statusCode: '201', message: 'Password has successfully Changed.' })
        return
      } catch (err) {
        // console.log('Error in sending mail', err)
        res.status('206').send({ statusCode: '206', message: 'Could not reset your password.' })
        return
      }
    } else {
      res.status('206').send({ statusCode: '206', message: 'Could not reset your password.' })
      return
    }


  } catch (err) {
    res.status('206').send({ statusCode: '206', message: 'Could not reset your password.' })
    return;

  }
}

