const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');  // Import loginUser from the controller

// POST route for user login
router.post('/login', loginUser);  // Calls the loginUser function in the controller

module.exports = router;

