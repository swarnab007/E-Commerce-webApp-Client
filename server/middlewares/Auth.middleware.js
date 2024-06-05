const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

// protected routes
exports.requiresignIn = async (req, res, next) => {
    // console.log("Hello from requiresignIn middleware");
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access
exports.adminAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Admin access denied",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "error in admin middleware" });
  }
};
