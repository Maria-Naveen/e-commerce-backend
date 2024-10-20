const verifyAdmin = (req, res, next) => {
  const user = req.user;

  if (user && user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = verifyAdmin;
