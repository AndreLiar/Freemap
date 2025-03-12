<<<<<<< HEAD
=======
//src/routes/profileRoutes.js
>>>>>>> origin/1-featuresloginandsignupfrontend
const express = require("express");
const {
  getProfileController,
  saveProfileController,
  updateProfileFieldController,
    getProfilesNearbyController,
    uploadProfilePhotoController,
<<<<<<< HEAD

} = require("../controllers/profileController");
const multer = require("multer");

const { verifyToken } = require("../middlewares/authMiddleware");
=======
    getProfilesInIleDeFranceController,

} = require("../controllers/profileController");
const multer = require("multer");
const { verifyToken } = require("../middlewares/authMiddleware");
const rateLimit = require("express-rate-limit");

const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  message: { message: "Too many requests, please try again later." }
});
>>>>>>> origin/1-featuresloginandsignupfrontend



// This will store uploaded files in a local /uploads folder (you can remove them after uploading to Cloudinary)
const upload = multer({ dest: "uploads/" });
const router = express.Router();

// Route for fetching the authenticated user's profile
router.get("/me", verifyToken, getProfileController);

// Route for creating or updating the authenticated user's profile
router.put("/me", verifyToken, saveProfileController);

// Route for updating individual fields of the authenticated user's profile
router.patch("/me", verifyToken, updateProfileFieldController);


<<<<<<< HEAD
// Route to fetch profiles near a specific location
router.get("/nearby", verifyToken, getProfilesNearbyController);


=======
>>>>>>> origin/1-featuresloginandsignupfrontend
// New route to upload a profile photo
router.post("/me/photo", verifyToken, upload.single("photo"), (req, res, next) => {
    console.log("Reached /me/photo route");
    next();
  }, uploadProfilePhotoController);
<<<<<<< HEAD
=======

  // Public route: Get all profiles in Île-de-France (accessible to everyone)
router.get("/ile-de-france", searchLimiter, getProfilesInIleDeFranceController);
>>>>>>> origin/1-featuresloginandsignupfrontend
  
  module.exports = router;