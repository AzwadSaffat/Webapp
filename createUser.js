const mongoose = require('mongoose');
const User = require('./backend/models/User'); // Corrected path to User.js

// MongoDB Atlas connection string
const dbURI = 'mongodb+srv://Azwad:azwadhossain@cluster0.nnjb8bt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected');
    createUser(); // Call the function to create a user
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Create a new user instance
async function createUser() {
    const newUser = new User({
        email: 'testuser@example.com', // Example email
        username: 'testuser', // Example username
        password: 'testpassword123', // Example password
    });

    try {
        // Save the user to the database
        await newUser.save();
        console.log('User created successfully!');
    } catch (error) {
        console.log('Error creating user:', error.message);
    }
}
