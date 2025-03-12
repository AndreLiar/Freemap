<<<<<<< HEAD
=======
//src/index.js
>>>>>>> origin/1-featuresloginandsignupfrontend
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const admin = require("firebase-admin");

// Firebase Admin Initialization
const serviceAccount = require("./config/freemap-2e057-firebase-adminsdk-fbsvc-8c0db560e7.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Connect to MongoDB
connectDB();

// Start the server
<<<<<<< HEAD
const PORT = process.env.PORT || 5000;
=======
const PORT = process.env.PORT || 5001;
>>>>>>> origin/1-featuresloginandsignupfrontend
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
