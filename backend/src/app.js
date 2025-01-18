const express = require('express');
const cors = require('cors');

// Create an Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

module.exports = app;
