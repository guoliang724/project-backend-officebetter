const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("body", req.body);
  res.send({
    username: "admin",
    password: "admin",
  });
});

module.exports = router;
