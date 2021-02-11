require("./user");

const sequelize = require("./db");

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("all models are set...");
  })
  .catch((err) => {
    console.log(err);
  });
