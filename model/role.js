const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const { set } = require("./db");

//create role model
const Role = sequelize.define(
  "role",
  {
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    authAuthor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    menus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
      get() {
        return this.getDataValue("menus").split(",");
      },
      set(value) {
        return this.setDataValue("menus", value.join(","));
      },
    },
  },
  {
    createdAt: true,

    updatedAt: false,
    paranoid: true,
  }
);

module.exports = Role;
