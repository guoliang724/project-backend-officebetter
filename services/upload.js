const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const User = require("../model/user");
const authen = require("../middleware/authen");
//constant variables
const baseURl = "http://localhost:5001/upload/";
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
//limits 4 mb
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 4 * 1024,
  },
});
var uploadSingle = upload.single("avatar");

//add on handle error function

router.post("/", authen, (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.send({
        statis: 0,
        msg: "Upload File Failed!",
      });
    }

    //get the filename
    var filename = req.file.filename;
    //get the url information
    var url = baseURl + filename;
    //get the user id of the user

    var useId = req.user.id;

    //update the image url in database
    const result = await User.update(
      { imgUrl: url },
      {
        where: {
          id: useId,
        },
      }
    );

    res.send({
      status: 1,
      data: {
        filename,
        url,
      },
    });
  });
});

module.exports = router;
