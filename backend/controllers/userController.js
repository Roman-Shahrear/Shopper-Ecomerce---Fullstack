const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// For Register Or Sign Up
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "Existing user found with this same email address",
      });
    }
  
    let cart = {};
    for (let index = 0; index < 300; index++) {
      cart[index] = 0;
    }
  
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      cartData: cart,
    });
  
    sendToken(user, 201, res);
    await user.save();
  });

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    const passCompare = bcrypt.compare(req.body.password, user.password);
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      // Create JWT token
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        errors: "Wrong password",
      });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
    try {
      // Retrieve user data from the database
      const userData = await User.findOne({ _id: req.user.id });
  
      // Check if userData, cartData, and itemId exist
      if (userData && userData.cartData && req.body.itemId) {
        // Increment the quantity of the specified item
        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
  
        // Update the user's cartData
        const updatedUserData = await User.findOneAndUpdate(
          { _id: req.user.id },
          { cartData: userData.cartData },
          { new: true } // Return the updated document
        );
  
        // Log the updated user data
        console.log("Updated User Data:", updatedUserData);
  
        // Send a success response
        res.status(200).json({ success: true, message: "Item added to the cart" });
      } else {
        // Invalid request data
        res.status(400).json({ errors: "Invalid request data" });
      }
    } catch (error) {
      // Handle errors, log them, and send an appropriate response
      console.error("Error adding to cart:", error);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  });
