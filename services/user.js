const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const config = require("config");

//login
router.post("/login", async (req, res) => {
  const { loginId, loginPwd } = req.body;
  const result = await User.findAll({
    where: {
      loginId,
      loginPwd,
    },
  });
  //user exsit
  if (result.length !== 0) {
    var user = {};
    user.id = result[0].id;
    user.username = result[0].loginId;
    user.role = result[0].role;
    user.imgUrl = result[0].imgUrl;

    //transfer to jwt and send it to client
    user = jwt.sign(user, config.get("jwt-secret"), {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
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

//add user
router.post("/add", async (req, res) => {
  const { loginId, loginPwd, email, role } = req.body;
  const result = await User.create({ loginId, loginPwd, email, role });
  console.log(result.toJSON());
  res.send({
    status: 1,
    data: result,
  });
});

//update user
router.post("/update", async (req, res) => {
  const { id, loginId, loginPwd, email, role } = req.body;
  try {
    const result = await User.update(
      { loginId, loginPwd, email, role },
      {
        where: {
          id,
        },
      }
    );
    res.send({
      status: 1,
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
});

//delete user
router.post("/delete", async (req, res) => {
  const { id } = req.body;
  console.log("id", id);
  const result = await User.destroy({
    where: {
      id,
    },
  });

  console.log("result", result);
  if (result === 1) {
    res.send({
      status: 1,
      data: "delete success!",
    });
  } else {
    res.send({
      status: 0,
      data: null,
    });
  }
});

//get userlist information
router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send({
    status: 1,
    data: users,
  });
});

module.exports = router;
