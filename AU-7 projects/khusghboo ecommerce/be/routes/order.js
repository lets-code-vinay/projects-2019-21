
const express = require('express')
const router = express.Router()
const { getUserByID, pushOrderInPurchaseList } = require('../controllers/user')
const { isSignedIn, isAuthenticated, isSeller } = require('../controllers/auth')
const { updateStock } = require('../controllers/product')
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require('../controllers/order')


router.param("userId", getUserByID)
router.param("orderId", getOrderById)


router.post("/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)
router.get("/all/:userId", isSignedIn, isAuthenticated, getAllOrders)
router.get("/status/:userId", isSignedIn, isAuthenticated, isSeller, getOrderStatus)
router.put("/:orderId/status/:userId", isSignedIn, isAuthenticated, isSeller, updateStatus)
module.exports = router
