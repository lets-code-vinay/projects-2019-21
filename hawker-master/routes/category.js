const express = require('express');
const router = express.Router(); 
const authentication = require('../middleware/authentication')
const {createCategoryValidator} = require("../middleware/express-validator/expressValidator");
const {addCategory, getCategories} = require('../functions/categoryFunctions/category')
const getCategorybyId = require('../functions/categoryFunctions/getCategoryById');

//image uploading 
const upload = require('../utils/multer')

router.post('/create',authentication, 
                      upload.single('categoryImage'),createCategoryValidator, addCategory)

router.get('/getCategory', getCategories)

router.get('/:category_id',getCategorybyId);

module.exports = router; 

 {/*
  create category
  get by category id
  search for category
*/}