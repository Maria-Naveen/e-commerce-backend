const userService = require("../services/user.service");
const catchAsyncError = require("../utils/catchAsyncError");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const register = catchAsyncError(async (req, res) => {
  const { name, email, password, address, isAdmin } = req.body;

  const user = await userService.register(
    name,
    email,
    password,
    address,
    isAdmin,
    transporter
  );
  res.status(201).json(user);
});

const login = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.login(email, password);
  res.status(200).json(user);
});

const verifyEmail = catchAsyncError(async (req, res) => {
  const { token } = req.params;
  const result = await userService.verifyEmail(token);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
});

module.exports = { register, login, verifyEmail };
