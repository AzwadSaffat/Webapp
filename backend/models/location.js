const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price_range: { type: String, required: true },
  rating: { type: Number, required: true },
  popularity_rating: { type: Number, required: true },
  location: { type: String, required: true }  
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
