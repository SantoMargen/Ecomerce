const express = require("express");
const ControllerUser = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authenticationRegisterAdmin = require("../middlewares/authenticationRegisterAdmin");
const router = express.Router();

router.post(
  "/adminRegister",
  authentication,
  authenticationRegisterAdmin,
  ControllerUser.registerAdmin
);
router.post("/register", ControllerUser.registeruser);
router.post("/login", ControllerUser.loginUser);
router.put("/users/:userId", authentication, ControllerUser.editUser);

module.exports = router;
