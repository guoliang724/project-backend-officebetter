const express = require("express");
const path = require("path");
const app = express();
const statcPath = path.resolve(__dirname, "public");
const sequelize = require("sequelize");
const login = require("./services/login");
app.use(express.static(statcPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/login", login);
//listening on port 5000
app.listen(5001, () => {
  console.log("server(:5000) is running....");
});

//setting up the database..
