const express = require("express");
const router = express.Router();
const Role = require("../model/role");

//getting the list of role
router.get("/roles", async (req, res) => {
  const roles = await Role.findAll();
  res.send({
    status: 1,
    data: roles,
  });
});

//adding a role
router.post("/add", async (req, res) => {
  const { rolename } = req.body;
  try {
    const newrole = Role.build({ rolename });
    await newrole.save();
    res.send({
      status: 1,
      data: newrole.toJSON(),
    });
  } catch (err) {
    res.send({
      status: 1,
      error: err,
    });
  }
});

//updating a role
router.post("/update", async (req, res) => {
  const { id, menus, authTime, authAuthor } = req.body;
  const result = await Role.update(
    { menus, authTime, authAuthor },
    {
      where: {
        id,
      },
    }
  );
  console.log("updateRole", result);
  res.send({
    status: 1,
    data: result,
  });
});

module.exports = router;
