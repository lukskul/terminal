// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Define the directory for static files
const publicDirectoryPath = path.join(__dirname, 'public');

// Serve static files from the public directory
app.use(express.static(publicDirectoryPath));

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
