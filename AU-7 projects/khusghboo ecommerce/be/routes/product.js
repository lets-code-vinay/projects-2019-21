const express = require("express");
const router = express.Router();
const {
  getProductById,
  getSearch,
  createProduct,
  getProduct,
  updateProduct,
  removeProduct,
  getAllProduct,
  getAllUniqueCategories,
  getProductByCategory
} = require("../controllers/product");
const {
  isSignedIn,
  isAuthenticated,
  isSeller,
} = require("../controllers/auth");
const { getUserByID } = require("../controllers/user");

router.param("userId", getUserByID);
router.param("productId", getProductById);

router.get("/search", getSearch);
router.get("/filterByCategory/:categoryId/:pageNum", getProductByCategory);

router.get("/all", getAllProduct);
router.get("/:productId", getProduct);
router.get("/categories", getAllUniqueCategories);
router.post(
  "/create/:userId",
  isSignedIn,
  isAuthenticated,
  isSeller,
  createProduct
);
router.put(
  "/update/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isSeller,
  updateProduct
);
router.delete(
  "/delete/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isSeller,
  removeProduct
);

module.exports = router;
