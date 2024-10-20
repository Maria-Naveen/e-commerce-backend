const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/customErrors");

const register = async (name, email, password, address, isAdmin) => {
  if (!name || !email || !password || !address) {
    throw new ValidationError("All fields are required!");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ValidationError("User already exists.Please login.");
  }

  const newUser = new User({ name, email, password, address, isAdmin });
  await newUser.save();

  return { message: "User registerd successfully!" };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("Can't find the specified user.");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new UnauthorizedError("Password is incorrect.");
  }

  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SEC_KEY,
    {
      expiresIn: "3h",
    }
  );

  return { token };
};

module.exports = { register, login };
