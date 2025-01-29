const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the CORS middleware
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies

app.use(bodyParser.json());

// API Routes
app.use("/api/profile", profileRoutes);

module.exports = app;
