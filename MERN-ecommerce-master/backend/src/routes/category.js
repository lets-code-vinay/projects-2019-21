 const express = require('express');
const router = express.Router(); 
const {requireSignin, adminMiddleware } = require('../common-middleware')
 const {addCategory, getCategories} = require('../controller/category')
//image uploading 
const upload = require('../utils/multer')

router.post('/category/create',requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory)
router.get('/category/getCategory', getCategories)

 module.exports = router; 