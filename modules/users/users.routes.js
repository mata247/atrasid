const mongoose = require("mongoose");
const express = require("express");
const flash = require('express-flash'); // Import express-flash for flash messages
const { register, verifyUser } = require("./controllers/register"); // Import the verifyUser function
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const login = require('./controllers/login');

const userRoutes = express.Router();

// Configure and use express-flash for flash messages
userRoutes.use(flash());

// Route to render the registration form
userRoutes.get("/register", (req, res) => {
  res.render("register"); // Assuming you have the "register.ejs" view
});

// Route to render the login form
userRoutes.get("/login", (req, res) => {
  res.render("login", { message: req.flash('error') }); // Pass flash messages to the view
});

// Registration route
userRoutes.post("/register", register);

// Verification route
userRoutes.get("/verify", verifyUser); // Handle GET request for verification link

// Define the POST route for user login
userRoutes.post('/login', login);

module.exports = userRoutes;
