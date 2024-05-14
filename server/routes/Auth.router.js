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
// GET : user protected routes
router.get("/auth-user", requiresignIn, (req, res) => {
  res.status(200).send({ ok: true});
});
// GET : admin protected routes
router.get("/auth-admin", requiresignIn, adminAccess, (req, res) => {
  res.status(200).send({ ok: true});
});

module.exports = router;
