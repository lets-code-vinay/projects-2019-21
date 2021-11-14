const { check } = require("express-validator");

//---------------------User validator----------------------------------//
module.exports.registerUserValidator = [
  check("name", "Name is empty").not().isEmpty(),
  check("lastName", "Last name is empty").not().isEmpty(),
  //check("userName", "Username is empty").not().isEmpty(),
  check("email", "E-mail is empty").isEmail(),
  check(
    "password",
    "Passwords needs to contain 6 letters and less than 12"
  ).isLength({ min: 6, max: 12 }),
];

module.exports.loginUserValidator = [
  check("email", "E-mail is empty").isEmail(),
  check(
    "password",
    "Passwords needs to contain 6 letters and less than 12"
  ).isLength({ min: 6 }),
];

module.exports.searchUserByUsernameValidator = [
  check("userNameFromSearch", "Search is empty").not().isEmpty(),
];

module.exports.changeUserDataValidator = [
  check("changeUserData", "Input is empty").not().isEmpty(),
];

module.exports.checkActualPasswordValidator = [
  check(
    "passwordToCheck",
    "Password has to be 6 letter and below 12"
  ).isLength({ min: 6, max: 12 }),
];

module.exports.changeUserPasswordValidator = [
  check(
    "newPassword",
    "New password should be 6 letter and below 12"
  ).isLength({ min: 6, max: 12 }),
];
//---------------------------------------------------------------------------//

//-----------category validator--------------------
module.exports.createCategoryValidator = [
  check("name", "Name is empty").not().isEmpty(),
  check("slug", "slug is empty").not().isEmpty(),
  check("categoryImages", "categoryImages is empty").not().isEmpty(),
  check("parentId", "parentId is empty").isEmail(),
];
//-------------------------------------------------------------//

//-----------Product validator--------------------
module.exports.createProductValidator = [
  check("name", "Product Name is empty").not().isEmpty(),
  check("slug", "slug is empty").not().isEmpty(),
  check("ProductImages", "Please select ProductImages").not().isEmpty(),
  check("parentId", "parentId must be there").isEmail(),
  check("description", "description is empty").isEmail(),
  check("parentId", "parentId must be there").isEmail(),
];
//-------------------------------------------------------------//

//------------------------post validator------------------------
module.exports.createPostValidator = [
  check("textOfThePost", "Text is required").not().isEmpty(),
];

module.exports.searchForPostValidator = [
  check("searchInput", "Search is empty").not().isEmpty(),
];

module.exports.addCommentValidator = [
  check("textOfTheComment", "Text is empty").not().isEmpty(),
];
//-----------------------------------------------------------------//

