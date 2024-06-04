const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    purchaser: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    payment: {},
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
