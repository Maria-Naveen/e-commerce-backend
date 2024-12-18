const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const validateData = require("../middlewares/dataValidation");
const registerValidationSchema = require("../validations/register.validation");
const loginValidationSchema = require("../validations/login.validation");

router.post(
  "/register",
  validateData(registerValidationSchema),
  userController.register
);
router.post(
  "/login",
  validateData(loginValidationSchema),
  userController.login
);
router.get("/verify/:token", userController.verifyEmail);

module.exports = router;
