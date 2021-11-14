const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  
  const token = req.header("authentication-token");
console.log("here is the token",token);
  const decoded = jwt.verify(token, config.get("jsonWebTokenSecret"));
console.log("here is the decoded",decoded);
  req.user = decoded.user;

  next();
};
