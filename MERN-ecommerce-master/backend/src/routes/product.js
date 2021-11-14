const express = require('express');
const {requireSignin, adminMiddleware } = require('../common-middleware')
const {createProduct} = require('../controller/product')
const router = express.Router(); 

// //-------------image uploading----------------//
const upload = require('../utils/multer')
// //-------------------------------------------------//
router.post('/product/create', requireSignin, adminMiddleware, upload.single('productPicture'), createProduct)
router.post('/product/create/mul', requireSignin, adminMiddleware, upload.array('productPictures',6), createProduct)

//router.get('/category/getCategory', getCategories)

 module.exports = router; 