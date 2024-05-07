const express = require("express");
const { register, login, test } = require("../controllers/Auth.controller.js");
const {
  requiresignIn,
  adminAccess,
} = require("../middlewares/Auth.middleware.js");

// setting up router object
const router = express.Router();

// POST : register route
router.post("/register", register);
// POST : login route
router.post("/login", login);
// GET : test route
router.get("/test", requiresignIn, adminAccess, test);

module.exports = router;
