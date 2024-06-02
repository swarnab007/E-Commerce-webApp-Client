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

// update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password, phoneNo, address } = req.body;
    const user = await User.findById(req.user.id);

    // hashing the password
    const salt = 10;
    const hashedPass = (await password)
      ? bcrypt.hash(password, salt)
      : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPass || user.password,
        phoneNo: phoneNo || user.phoneNo,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.addToCart = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.params.slug;
    const currentUser = req.userId;

    const isProductAvailable = await addToCartModel.findOne({ productId });

    console.log("isProductAvailabl   ", isProductAvailable);

    if (isProductAvailable) {
      return res.json({
        message: "Already exits in cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product Added in Cart",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;

// Controller to remove an item from the user's cart
exports.removeFromCart = async (req, res) => {
  const { slug } = req.params;
  const userId = req.user._id; // Assuming you have middleware to authenticate and attach the user to the request

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists in the user's cart
    const productIndex = user.cart.findIndex(
      (item) => item.toString() === slug
    );

    if (productIndex === -1) {
      return res.status(400).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    user.cart.splice(productIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
