const jwt = require("jsonwebtoken");
const token = "user_id";
const config = require("config");

module.exports = function (req, res, next) {
  var cookie = req.cookies[token];
  console.log("cookie", cookie);
  //does not exist in browser
  if (!cookie) {
    cookie = req.headers[token];
  }
  //does not exist in header
  if (!cookie) {
    return res.status(403).send("forbidden.....");
  }
  try {
    //verify the token
    var user = jwt.verify(cookie, config.get("jwt-secret"));
    console.log("jwt", user);
  } catch {
    return res.status(403).send("forbidden.....");
  }
  //pass the validation
  req.user = user;
  next();
};
