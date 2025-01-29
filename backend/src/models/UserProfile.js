const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },// Firebase UID
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  description: { type: String, required: true },
  location: {
    address: { type: String, required: false }, // store the user’s string
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  // New field for storing the Cloudinary URL of the profile photo
  profilePhoto: { type: String, required: false },
  // NEW: Minimal SIRET field. Not required, but must be 14 digits if present.
  siret: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        // Allow empty or 14 digits
        return !v || /^\d{14}$/.test(v);
      },
      message: "SIRET must be exactly 14 digits (if provided)."
    }
  },
  certified: { type: Boolean, default: false }, // Add certification status

});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
