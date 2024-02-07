const express = require("express");

const { registerUser, loginUser, addToCart } = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authMiddleware");

const router =  express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

router.route("/addtocart").post(isAuthenticatedUser, addToCart);

module.exports = router;