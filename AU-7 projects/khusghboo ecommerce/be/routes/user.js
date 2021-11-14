const express = require('express')
const router = express.Router()
const { getUserByID, getUser, getAllUser, updateUser, userPurchaseList, forgetPassword, resetPassword, changePassowrd } = require('../controllers/user')
const { isSignedIn, isAuthenticated } = require('../controllers/auth')



router.get("/all", getAllUser)


router.param("userId", getUserByID)

router.get('/:userId', isSignedIn, isAuthenticated, getUser)
router.put("/update/:userId", isSignedIn, isAuthenticated, updateUser)
router.get("/orders/:userId", isSignedIn, isAuthenticated, userPurchaseList)

router.post("/forgetPassword", forgetPassword)

router.get("/reset/:token", resetPassword)
router.post("/reset/:token", changePassowrd)

module.exports = router;
