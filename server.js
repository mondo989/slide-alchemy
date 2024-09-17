// server.js

const express = require('express');
const path = require('path');
const routes = require('./routes/index');

// Initialize the app
const app = express();

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views')); // Ensure the views directory is correctly set

// Middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: true }));  // Body parser is built into Express now
app.use(express.json());  // Parse incoming JSON requests

// Serve static files (CSS, JS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in the routes directory
app.use('/', routes);

// 404 Page Not Found handler
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// Error handling middleware for other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
