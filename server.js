const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./backend/routes/authRoutes');  // Path to your authentication routes

const app = express();

// Enable CORS for all routes
app.use(cors());

// Body parser middleware to parse JSON
app.use(bodyParser.json());

// MongoDB Atlas connection string
const dbURI = 'mongodb+srv://Azwad:azwadhossain@cluster0.nnjb8bt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Serve static files from the 'public' directory (to serve styles, images, JS files)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login.html file from the root directory
app.get('/', (req, res) => {
    console.log('Root route accessed'); // Log when the root route is accessed
    res.sendFile(path.join(__dirname, 'login.html'));  // Adjust path if necessary
});

// Serve the index.html file for the home route
app.get('/index.html', (req, res) => {
  console.log('Index route accessed');
  res.sendFile(path.join(__dirname, 'index.html'));  // Adjust the path to point to index.html in the root directory
});


app.get('/recommendations.html', (req, res) => {
  console.log('Rec route accessed');
  res.sendFile(path.join(__dirname, 'recommendations.html'));  // Adjust the path to point to index.html in the root directory
});


app.get('/polls.html', (req, res) => {
  console.log('Poll route accessed');
  res.sendFile(path.join(__dirname, 'polls.html'));  // Adjust the path to point to index.html in the root directory
});


app.get('/schedule.html', (req, res) => {
  console.log('Schedule route accessed');
  res.sendFile(path.join(__dirname, 'schedule.html'));  // Adjust the path to point to index.html in the root directory
});

// Use the authentication routes (this will include the login and register routes)
app.use('/api/auth', authRoutes);

// Set up the server to listen on a specific port
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});