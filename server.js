const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./backend/routes/authRoutes');  // Path to your authentication routes
const locationRoutes = require('./backend/routes/locationRoutes');  // Path to your location routes

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

// Serve other HTML files
app.get('/recommendations.html', (req, res) => {
  console.log('Rec route accessed');
  res.sendFile(path.join(__dirname, 'recommendations.html'));  // Adjust the path to point to recommendations.html
});

app.get('/polls.html', (req, res) => {
  console.log('Poll route accessed');
  res.sendFile(path.join(__dirname, 'polls.html'));  // Adjust the path to point to polls.html
});

app.get('/schedule.html', (req, res) => {
  console.log('Schedule route accessed');
  res.sendFile(path.join(__dirname, 'schedule.html'));  // Adjust the path to point to schedule.html
});

// Add the recommendations route
app.post('/api/recommendations', async (req, res) => {
  const { location, price_range, type } = req.body;

  try {
    // Query to filter locations based on user's input
    const recommendations = await Location.find({
      location: { $regex: location, $options: 'i' }, // Case-insensitive search
      price_range: price_range !== 'Any' ? price_range : { $exists: true },
      type: type !== 'Any' ? type : { $exists: true }
    });

    res.status(200).json(recommendations); // Return filtered locations
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
});

// Use the authentication routes (this will include the login and register routes)
app.use('/api/auth', authRoutes);

// Use the location routes
app.use('/api/locations', locationRoutes);

// Set up the server to listen on a specific port
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});