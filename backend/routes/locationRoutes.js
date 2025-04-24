const express = require('express');
const router = express.Router();
const Location = require('../models/location');

router.post('/add', async (req, res) => {
  const locationData = [
    {
      name: "Elements – Global Dining at InterContinental Dhaka",
      type: "Restaurant",
      price_range: "$$$$",
      rating: 5.0,
      popularity_rating: 95
    },
    {
      name: "Aqua Deck at InterContinental Dhaka",
      type: "Bar",
      price_range: "$$$$",
      rating: 5.0,
      popularity_rating: 90
    },
    {
      name: "The Garden Kitchen at Sheraton Dhaka",
      type: "Restaurant",
      price_range: "$$$$",
      rating: 5.0,
      popularity_rating: 88
    },
    {
      name: "HangOut - Dhanmondi",
      type: "Café",
      price_range: "$$",
      rating: 3.5,
      popularity_rating: 75
    },
    {
      name: "Justice Shahabuddin Ahmed Park",
      type: "Park",
      price_range: "$",
      rating: 4.2,
      popularity_rating: 80
    },
    {
      name: "Dhanmondi Lake",
      type: "Lake",
      price_range: "$",
      rating: 4.0,
      popularity_rating: 78
    }
  ];

  try {
    await Location.insertMany(locationData);
    res.status(201).send('Locations added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding locations');
  }
});

module.exports = router;
