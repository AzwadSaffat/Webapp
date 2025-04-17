const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// POST route for registering a new user
router.post('/register', registerUser);

// POST route for user login
router.post('/login', loginUser);

module.exports = router;
