// const mongoose = require("mongoose");
// const express = require("express");
// const crypto = require("crypto");
// const { sendEmail } = require("../../../managers/emailManager"); // Import the sendEmail module

// const userRoutes = express.Router();

// // ... Other routes ...

// // Verification route for sending the verification email
// userRoutes.get("/verify", async (req, res) => {
//   console.log('GET /verify route accessed');
//   try {
//     const usersModel = mongoose.model("users");
//     const { userId } = req.query;

//     // Find the user by ID
//     const user = await usersModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Generate a new verification token with an expiration time
//     const verificationToken = crypto.randomBytes(32).toString("hex");
//     const expirationTime = Date.now() + 3600000; // 1 hour expiration time (in milliseconds)

//     // Update the user's verification token and expiration time
//     user.verificationToken = verificationToken;
//     user.verificationTokenExpires = expirationTime;
//     await user.save();

//     // Construct the email message
// const emailSubject = "Email Verification";
// const emailText = `Click the following link to verify your email: https://localhost:8001/verify?token=${verificationToken}`;
// const emailHtml = `<p>Email verified successfully! You can now <a href="https://localhost:8001/account-activated">access your account</a>.</p>`;

// // Send the verification email using the sendEmail module
// await sendEmail(user.email, emailSubject, emailText, emailHtml);


//     // Redirect to the account-activated route after sending the email
//     //res.redirect('/account-activated');

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // ... Other routes ...

// module.exports = userRoutes;
