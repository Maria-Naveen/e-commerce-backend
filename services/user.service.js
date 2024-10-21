const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/customErrors");

const register = async (
  name,
  email,
  password,
  address,
  isAdmin,
  transporter
) => {
  if (!name || !email || !password || !address) {
    throw new ValidationError("All fields are required!");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ValidationError("User already exists.Please login.");
  }

  const newUser = new User({
    name,
    email,
    password,
    address,
    isAdmin,
    verified: false,
  });

  const verificationToken = newUser.generateVerificationToken();

  await newUser.save();
  sendVerificationEmail(newUser, verificationToken, transporter);

  return { message: "User registerd successfully! Verification email sent" };
};

const sendVerificationEmail = (user, token, transporter) => {
  const verificationUrl = `http://localhost:3000/api/verify/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: "Verify Account",
    html: `Click <a href='${verificationUrl}'>here</a> to confirm your email`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
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

const verifyEmail = async (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.USER_VERIFICATION_TOKEN_SECRET
    );
    const user = await User.findById(decoded.userId);

    if (!user) {
      return { success: false, message: "Invalid or expired token" };
    }

    user.verified = true;
    await user.save();

    return { success: true, message: "Email successfully verified!" };
  } catch (error) {
    return { success: false, message: "Server error" };
  }
};

module.exports = { register, login, verifyEmail };
