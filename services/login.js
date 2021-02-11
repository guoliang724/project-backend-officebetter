const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const config = require("config");
//get userinformation
router.post("/", async (req, res) => {
  const { loginId, loginPwd } = req.body;
  const result = await User.findAll({
    where: {
      loginId,
      loginPwd,
    },
  });

  console.log(result);
  //user exsit
  if (result.length !== 0) {
    var user = {};
    user.username = result[0].loginId;
    user.role = result[0].role;
    user.img = result[0].img;

    //transfer to jwt and send it to client
    user = jwt.sign(user, config.get("jwt-secret"), {
      expiresIn: 7 * 24 * 60 * 60,
    });

    return res.send({
      status: 1,
      data: user,
    });
  }
  return res.send({
    status: 0,
    msg: "no data",
  });
});

module.exports = router;
