const userService = require("../services/user.service");

const register = async (req, res) => {
  const { name, email, password, address } = req.body;

  const user = await userService.register(name, email, password, address);
  res.status(201).json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.login(email, password);
  res.status(200).json(user);
};

module.exports = { register, login };
