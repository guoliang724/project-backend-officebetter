const express = require("express");
const path = require("path");
const app = express();
const statcPath = path.resolve(__dirname, "public");
const cookieParser = require("cookie-parser");
const user = require("./services/user");
const upload = require("./services/upload");
const role = require("./services/role");
//initialize settings
app.use(express.static(statcPath));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//user
app.use("/user", user);
//role
app.use("/role", role);
//upolad file
app.use("/upload", upload);
//listening on port 5000
app.listen(5001, () => {
  console.log("server(:5000) is running....");
});

//initialize the database
require("./model/init");
