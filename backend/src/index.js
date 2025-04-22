//src/index.js
require("dotenv").config();
const serverless = require('serverless-http');
const app = require("./app");
const connectDB = require("./config/db");
const admin = require("firebase-admin");
const initSocket = require("./utils/webSocket");
const http = require("http");

// ✅ Firebase Admin Initialization via Base64 .env (no local JSON)
if (!admin.apps.length) {
  const base64 = process.env.FIREBASE_CREDENTIAL_BASE64;

  if (!base64) {
    throw new Error("Missing FIREBASE_CREDENTIAL_BASE64 in environment variables.");
  }

  try {
    const decoded = Buffer.from(base64, "base64").toString("utf8");
    const serviceAccount = JSON.parse(decoded);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (err) {
    console.error("Firebase Admin init error:", err.message);
    process.exit(1);
  }
}

// 🌐 Connect to MongoDB
connectDB();

// 🔌 Initialize the server and WebSocket
const server = http.createServer(app);
const io = initSocket(server);

// 🚀 Start the server
//const PORT = process.env.PORT || 5001;
//server.listen(PORT, () => {
//  console.log(`Server running on port ${PORT}`);
//});
module.exports.handler = serverless(app);
