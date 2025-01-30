//src/controllers/profileController.js
const { getProfile, updateProfileField, saveProfile , getProfilesInIleDeFrance} = require("../services/profileService");
const cloudinary = require("../config/cloudinary");

// Fetch the user's profile
const getProfileController = async (req, res) => {
  try {
    const profile = await getProfile(req.uid);

    // Handle missing profile
    if (!profile) {
      return res.status(404).json({ message: "Profile not found. Please create a profile first." });
    }

    // Return the profile if it exists
    res.status(200).json(profile);
  } catch (error) {
    // Handle other errors
    res.status(404).json({ message: error.message });
  }
};

// Create or update the user's profile
const saveProfileController = async (req, res) => {
  const { 
    name, 
    specialization, 
    hourlyRate, 
    description, 
    location, 
    profilePhoto, 
    siret // New: SIRET field
  } = req.body;

  // Check for required fields
  if (!name || !specialization || !hourlyRate || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // OPTIONAL: If a SIRET is provided, validate its format
  if (siret) {
    // Check if the SIRET is a 14-digit number
    if (!/^\d{14}$/.test(siret)) {
      return res.status(400).json({ message: "Invalid SIRET format: must be exactly 14 digits." });
    }
  }

  try {
    // Save the profile with the provided data
    const profile = await saveProfile(req.uid, {
      name,
      specialization,
      hourlyRate,
      description,
      location,    // location = { address, lat, lng }
      profilePhoto, // Optional: Cloudinary photo URL
      siret,        // Include SIRET if provided
    });

    // Respond with the updated profile
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error in saveProfileController:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Partially update a specific field in the user's profile
const updateProfileFieldController = async (req, res) => {
  const updates = req.body; // Extract fields to update from the request body

  // Check if there are no fields in the body
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No fields provided for update" });
  }

  try {
    // Call the service layer to update the profile
    const updatedProfile = await updateProfileField(req.uid, updates);

    // Return the updated profile to the client
    res.status(200).json(updatedProfile);
  } catch (error) {
     // If the service throws an Error for invalid SIRET, we can differentiate:
     if (error.message === "Invalid SIRET format") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// New controller for uploading a profile photo
const uploadProfilePhotoController = async (req, res) => {
  try {
    // 1) Check if a file is provided
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 2) Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_profiles", // optional folder in Cloudinary
    });

    // result.secure_url => the https Cloudinary URL
    if (!result || !result.secure_url) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
    }

    // 3) Update the user's profilePhoto in MongoDB
    // We can reuse your partial update service, sending { profilePhoto: <Cloudinary URL> }
    const updates = { profilePhoto: result.secure_url };
    const updatedProfile = await updateProfileField(req.uid, updates);

    // 4) Return the updated profile
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Controller: Get all profiles inside Île-de-France (Public)
 */
const getProfilesInIleDeFranceController = async (req, res) => {
  try {
    // Extract optional query params
    const { specialization, certified, limit, skip } = req.query;

    // Build the query filters
    const query = {};

    // Handle multiple specializations
    if (specialization) {
      query.specialization = { $in: specialization.split(",") }; // Split by comma and use $in for multiple values
    }

    // Handle certified filter
    if (certified === "true") {
      query.certified = true;
    }

    // Fetch profiles with filters
    const profiles = await getProfilesInIleDeFrance(query, limit, skip);

    // Return the results
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching Île-de-France profiles:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  getProfileController,
  saveProfileController,
  updateProfileFieldController,
  uploadProfilePhotoController, // add the new controller to exports
  getProfilesInIleDeFranceController,
};
