//src/index.js
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const admin = require("firebase-admin");
const initSocket = require("./utils/webSocket");
const http = require("http");

// Firebase Admin Initialization
const serviceAccount = require("./config/freemap-2e057-firebase-adminsdk-fbsvc-8c0db560e7.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize the server and WebSocket
const server = http.createServer(app);
const io = initSocket(server);

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
