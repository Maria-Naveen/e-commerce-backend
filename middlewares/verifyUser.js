const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized entry: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized entry: Malformed token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    req.user = { userId: user._id, isAdmin: user.isAdmin };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyUser;
