const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');  // Import loginUser from the controller
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Import your User model

// POST route for user login
router.post('/login', loginUser);  // Calls the loginUser function in the controller

// POST route for user registration
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    // Validate input data
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create a new user
        const user = new User({
            email,
            username,
            password
        });

        // Hash the password before saving the user
        user.password = await bcrypt.hash(password, 10);

        // Save the user to the database
        await user.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

module.exports = router;
