const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

//constant variables
const baseURl = "http://localhost:5001";
const fileFolder = path.resolve(__dirname, "../public", "upload");

//module template
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});
var upload = multer({ storage: storage });
var uploadSingle = upload.single("avatar");

//add on handle error function
router.post("/", (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.send({
        statis: 0,
        msg: "Upload File Failed!",
      });
    }
    var file = req.file;
    res.send({
      status: 1,
      data: {
        filename: file.filename,
        url: baseURl + file.filename,
      },
    });
  });
});

module.exports = router;
