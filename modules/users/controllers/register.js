const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const generateUniqueToken = require("../../../managers/generateUniqueToken");
const emailManager = require("../../../managers/emailManager");
const crypto = require("crypto");

const register = async (req, res) => {
  try {
    const usersModel = mongoose.model("users");

    const { email, password, confirm_password, name, balance, mobileNumber, country, cityOrTownOrVillage } = req.body;

    // Validations...

    if (!email) throw "Email must be provided!";
    if (!password) throw "Password must be provided!";
    if (password.length < 5) throw "Password must be at least 5 characters long.";

    if (!name) throw "Name is required";
    if (password !== confirm_password)
      throw "Password and confirmed password do not match!";

    const getDuplicateEmail = await usersModel.findOne({
      email: email,
    });

    if (getDuplicateEmail) throw "This email already exists!";

    // Generate a verification token
    const verificationToken = generateUniqueToken();

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await usersModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      balance: balance,
      mobileNumber: mobileNumber,
      country: country,
      cityOrTownOrVillage: cityOrTownOrVillage,
      verificationToken: verificationToken, // Store the verification token
      isVerified: false, // Initialize user as not verified
    });

    // Construct the email message for verification
    const emailSubject = "Email Verification";
    const verificationLink = `https://localhost:8001/verify?token=${verificationToken}`;
    const emailText = `Click the following link to verify your email: ${verificationLink}`;
    const emailHtml = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;

    // Send the verification email using the emailManager
    await emailManager.sendEmail(
      createdUser.email,
      emailSubject,
      emailText,
      emailHtml
    );

    // Respond with JSON
    res.status(201).json({
      status: "User registered successfully! Please check your email for verification instructions.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Verification route for verifying the user by clicking the link
const verifyUser = async (req, res) => {
  try {
    const usersModel = mongoose.model("users");
    const { token } = req.query;

    // Find the user by verification token
    const user = await usersModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "User not found or token has expired." });
    }

    // Log the user's current isVerified status before the update
    console.log("Current isVerified status:", user.isVerified);

    // Set the user's isVerified property to true
    user.isVerified = true;

    // Log the user's isVerified status after the update
    console.log("New isVerified status:", user.isVerified);

    await user.save();

    // Redirect to the account-activated page with a success message
    return res.render('verify', { successMessage: 'Email verification successful! You can now access your account.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { register, verifyUser };
