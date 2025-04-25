const express = require('express');
const router = express.Router();
const Location = require('../models/location'); // Import your Location model

// Route to get all locations (for recommendations, etc.)
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations); // Return all locations as JSON
  } catch (error) {
    console.error('Error fetching locations:', error); // Log error to the console
    res.status(500).json({ message: 'Error fetching locations', error });
  }
});

// Route to get recommendations based on filters (location, price range, type)
router.post('/recommendations', async (req, res) => {
  const { location, price_range, type } = req.body;
  try {
    const query = {};

    // Handle the location filter (case-insensitive)
    if (location && location !== 'Any') {
      query.location = { $regex: location, $options: 'i' };  // Case-insensitive match
    }

    // Handle the price_range filter
    if (price_range && price_range !== 'Any') {
      query.price_range = price_range;
    }

    // Handle the type filter
    if (type && type !== 'Any') {
      query.type = type;
    }

    // Fetch the recommendations based on the filters
    const recommendations = await Location.find(query);

    // If no recommendations found, send a meaningful message
    if (recommendations.length === 0) {
      return res.status(404).json({ message: 'No recommendations found for the given filters' });
    }

    res.status(200).json(recommendations); // Return the filtered recommendations
  } catch (error) {
    console.error('Error fetching recommendations:', error); // Log error to the console
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
});

module.exports = router;
