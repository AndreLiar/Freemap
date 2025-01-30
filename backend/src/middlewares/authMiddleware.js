//src/middlewares/authMiddleware.js
const admin = require("firebase-admin");

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid; // Attach UID to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = { verifyToken };
