const express = require("express");
const router = express.Router();
const { getUserByID } = require('../controllers/user')
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paymentb");


router.param("userId", getUserByID)
router.get("/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
