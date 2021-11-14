const express = require("express");
const router = express.Router();
const {
  getCategoryById,
  getCategory,
  getAllCategory,
  createCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { getUserByID } = require("../controllers/user");
const {
  isSignedIn,
  isSeller,
  isAuthenticated,
} = require("../controllers/auth");

router.param("userId", getUserByID);

//create route
router.get("/all", getAllCategory);
router.post(
  "/create/:userId",
  isSignedIn,
  isAuthenticated,
  isSeller,
  createCategory
);

router.param("categoryId", getCategoryById);
router.get("/:categoryId", isSignedIn, isAuthenticated, isSeller, getCategory);
router.put(
  "/update/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isSeller,
  updateCategory
);
router.delete(
  "/delete/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isSeller,
  removeCategory
);

module.exports = router;
