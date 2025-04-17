const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./backend/routes/authRoutes'); // Path to your authentication routes

// Initialize express app
const app = express();

// Body parser middleware to parse JSON
app.use(bodyParser.json());

// MongoDB Atlas connection string (replace with your own credentials)
const dbURI = 'mongodb+srv://Azwad:azwadhossain@cluster0.nnjb8bt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Set up the server to listen on a specific port
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// POST route for user login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
  
    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Return a success message if login is successful
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  });