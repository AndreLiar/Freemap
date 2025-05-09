//src/app.js
//const serverless = require('serverless-http');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the CORS middleware
const profileRoutes = require("./routes/profileRoutes.js");
const visioCallingRoutes = require("./routes/visioCallingRoutes.js");

const app = express();

// Enable CORS for all origins
app.use(cors({ origin: "https://freemap-puce.vercel.app", credentials: true }));
// Parse JSON request bodies

app.use(bodyParser.json());
// ✅ Add health check route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});
app.get("/api/ping", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is alive 🎉" });
});

// API Routes
app.use("/api/profile", profileRoutes);
app.use("/api/visio-calling", visioCallingRoutes);
//module.exports.handler = serverless(app);
module.exports = app;
