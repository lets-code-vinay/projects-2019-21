const express = require('express');
//const {requireSignin, adminMiddleware } = require('../common-middleware')
const router = express.Router(); 
//-----------------importing------------
const authentication = require('../middleware/authentication')
const {createProduct} = require('../functions/productFunctions/product');
const {createProductValidator} = require('../middleware/express-validator/expressValidator');
const getProducts = require('../functions/productFunctions/getproducts')
const getProductbyId = require('../functions/productFunctions/getProductById')
const getProductsByDate = require('../functions/productFunctions/getProductsByDate');
const removeProduct = require('../functions/productFunctions/removeProduct');
// //-------------image uploading----------------//
const upload = require('../utils/multer')
// //-------------------------------------------------//

router.post('/create', authentication,
                       upload.array('productPictures',6),
                       createProductValidator, 
                       createProduct
                       );
router.get('/products', getProducts);
                       
router.get('/products/:product_id',getProductbyId)

//mot worked
router.get('/products/latestproducts', getProductsByDate);

//not working
router.post('/products/deleteproduct/:product_id', removeProduct)


 module.exports = router; 