const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const https = require('https');
const fs = require('fs');
const errorHandler = require('./handlers/errorHandler');
require('dotenv').config();

// Create an Express app instance
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// Set the views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Database connection
mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log('Mongo connection successful!');
  })
  .catch(() => {
    console.log('Mongo connection failed!');
  });

// Models initialization
require('./models/users.model');
require('./models/transactions.model');
require('./models/posts.model');

// Routes
const userRoutes = require('./modules/users/users.routes');
const transactionRoutes = require('./modules/transactions/transactions.routes');
const postRoutes = require('./modules/Posts/post.routes');

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/Posts', postRoutes);

// Use the login.js controller for the login route
app.use('/api/users', require('./modules/users/controllers/login'));

// Route to render the new post creation page
app.get('/new-post', (req, res) => {
  res.render('new-post');
});

app.get('/', async (req, res) => {
  try {
    const Post = mongoose.model('Post');
    const allPosts = await Post.find();
    res.render('home', { posts: allPosts });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error retrieving posts.',
    });
  }
});

app.get('/welcome', (req, res) => {
  // Check if the user is authenticated and obtain the user's email address
  // Replace this logic with your authentication and session setup
  if (!req.session || !req.session.accessToken) {
    // Redirect to the login page if the user is not authenticated
    return res.redirect('/login');
  }

  // Assuming you have stored the user's email in the session during login
  const userName = req.session.userName; // Change this based on your session setup

  

// Inside your /verify route in app.js
app.get('/verify', async (req, res) => {
  try {
    const usersModel = mongoose.model('users');
    const { token } = req.query;

    // Find the user by verification token
    const user = await usersModel.findOne({ verificationToken: token });

    if (!user) {
      // Handle the case where the user is not found or the token is invalid
      return res.status(404).json({ message: 'User not found or token has expired.' });
    }

    // Set isVerified to true
    user.isVerified = true;
    await user.save();

    // Render the verify.ejs template and pass the user data
    res.render('verify', { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Render the welcome.ejs template and pass the userName variable
res.render('welcome', { userName });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/down', (req, res) => {
  res.render('down');
});

// Route for new members (registration success)
app.get('/new-members', (req, res) => {
  // Your existing code for handling new members
});

// Route for account activation confirmation
app.get('/account-activated', (req, res) => {
  res.render('account-activated');
});

// Error handling middleware
app.use(errorHandler);

// Start the HTTPS server
const port = process.env.PORT || 8001;
const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => console.log(`Listening to port ${port}`));
