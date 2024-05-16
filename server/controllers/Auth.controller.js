const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phoneNo, address } = req.body;
    if (!name || !email || !password || !phoneNo || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // hashing the password
    const salt = 10;
    const hashedPass = await bcrypt.hash(password, salt);

    // saving the object in DB
    const user = await User.create({
      name,
      email,
      password: hashedPass,
      phoneNo,
      address,
    });
    // send success response
    res
      .status(201)
      .json({ success: true, message: "Registered successfully", user });
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // check existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    // compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.token = token;
    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    // send cookie in response

    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: `Welcome back ${user.name}`,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
          address: user.address,
          role: user.role,
          token: user.token,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// test controller
exports.test = (req, res) => {
  try {
    console.log("test route");
    res.send("Test route is working fine!");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
