const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/product.model.js");
const Order = require("../models/order.model.js");

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

exports.addToCart = async (req, res) => {
  try {
    const { slug, quantity } = req.body;
    // Assuming you have middleware to authenticate and attach the user to the request

    const user = await User.findById(req.user.id);
    console.log(user);
    console.log("add to cart backend");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === product._id.toString()
    );
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ productId: product._id, quantity });
    }

    await user.save();
    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (cartIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    user.cart.splice(cartIndex, 1);
    await user.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get cart details
exports.getCartDetails = async (req, res) => {
  try {
    // Assuming you have middleware to authenticate and attach the user to the request

    const user = await User.findById(req.user.id).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete cart items after payment
exports.deleteCartItems = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Clear the cart items
    user.cart = [];

    // Save the updated user data
    await user.save();

    return res.status(200).json({ success: true, message: "No items in cart" });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete cart items", error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ purchaser: req.user.id })
      .populate({
        path: "products", // Directly populate the products array
        select: "name description price image", // Select the fields you want
      })
      .populate("purchaser", "name");

    console.log("Orders being sent:", orders); // Log orders being sent
    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to get orders" });
  }
};

// admin orders
// get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: "products",
        select: "name description price image",
      })
      .populate("purchaser", "name")
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get orders", error });
  }
};

// change status of order
exports.changeOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Status changed successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update status", error });
  }
};
