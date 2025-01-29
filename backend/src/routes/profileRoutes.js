const express = require("express");
const {
  getProfileController,
  saveProfileController,
  updateProfileFieldController,
    getProfilesNearbyController,
    uploadProfilePhotoController,

} = require("../controllers/profileController");
const multer = require("multer");

const { verifyToken } = require("../middlewares/authMiddleware");



// This will store uploaded files in a local /uploads folder (you can remove them after uploading to Cloudinary)
const upload = multer({ dest: "uploads/" });
const router = express.Router();

// Route for fetching the authenticated user's profile
router.get("/me", verifyToken, getProfileController);

// Route for creating or updating the authenticated user's profile
router.put("/me", verifyToken, saveProfileController);

// Route for updating individual fields of the authenticated user's profile
router.patch("/me", verifyToken, updateProfileFieldController);


// Route to fetch profiles near a specific location
router.get("/nearby", verifyToken, getProfilesNearbyController);


// New route to upload a profile photo
router.post("/me/photo", verifyToken, upload.single("photo"), (req, res, next) => {
    console.log("Reached /me/photo route");
    next();
  }, uploadProfilePhotoController);
  
  module.exports = router;