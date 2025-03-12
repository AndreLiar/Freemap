<<<<<<< HEAD
=======
//src/config/db.js
>>>>>>> origin/1-featuresloginandsignupfrontend
const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from the environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
<<<<<<< HEAD
=======
      serverSelectionTimeoutMS: 5000, // Prevents indefinite hanging if DB is unreachable
      socketTimeoutMS: 45000, // Closes connection if inactive

>>>>>>> origin/1-featuresloginandsignupfrontend
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
