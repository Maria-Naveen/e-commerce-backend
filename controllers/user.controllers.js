const userService = require("../services/user.service");
const catchAsyncError = require("../utils/catchAsyncError");

const register = catchAsyncError(async (req, res) => {
  const { name, email, password, address, isAdmin } = req.body;

  const user = await userService.register(
    name,
    email,
    password,
    address,
    isAdmin
  );
  res.status(201).json(user);
});

const login = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.login(email, password);
  res.status(200).json(user);
});

module.exports = { register, login };
