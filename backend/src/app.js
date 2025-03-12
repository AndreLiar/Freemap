<<<<<<< HEAD
=======
//src/app.js
>>>>>>> origin/1-featuresloginandsignupfrontend
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the CORS middleware
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Enable CORS for all origins
<<<<<<< HEAD
app.use(cors());

=======
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
>>>>>>> origin/1-featuresloginandsignupfrontend
// Parse JSON request bodies

app.use(bodyParser.json());

// API Routes
app.use("/api/profile", profileRoutes);

module.exports = app;
