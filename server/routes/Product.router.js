const express = require("express");
const formidable = require("express-formidable");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getPhoto,
  filterProduct,
  searchProduct,
  similarProducts,
  generateToken,
  processPayment,
} = require("../controllers/Product.controller");
const {
  requiresignIn,
  adminAccess,
} = require("../middlewares/Auth.middleware");

const router = express.Router();

// create product
router.post(
  "/create-product",
  requiresignIn,
  adminAccess,
  formidable(),
  createProduct
);

// get all products
router.get("/all-products", getAllProducts);

// get single product
router.get("/product/:slug", getSingleProduct);

// get photo
router.get("/product/photo/:pid", getPhoto);

// delete product
router.delete(
  "/delete-product/:pid",
  requiresignIn,
  adminAccess,
  deleteProduct
);

// update product
router.put(
  "/update-product/:pid",
  requiresignIn,
  adminAccess,
  formidable(),
  updateProduct
);

// filter product
router.post("/filter-product", filterProduct);

// search product
router.get("/search-product/:keyword", searchProduct);

// get similar products
router.get("/similar-products/:pid/:cid", similarProducts);

// get braintree token
router.get("/braintree-token", requiresignIn, generateToken);

// make payment
router.post("/braintree/payment", requiresignIn, processPayment);

module.exports = router;
