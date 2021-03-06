//setting up the database..
const config = require("config");
const { Sequelize } = require("sequelize");
const userId = config.get("username");
const psw = config.get("psw");

//change to your databasename, loginUsername and password
const sequelize = new Sequelize("workflow", userId, psw, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
