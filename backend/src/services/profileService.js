<<<<<<< HEAD
const { findProfileByUID, createOrUpdateProfile } = require("../repositories/profileRepository");
const UserProfile = require("../models/UserProfile");

const getProfile = async (uid) => {
  const profile = await findProfileByUID(uid);
  if (!profile) throw new Error("Profile not found");
  return profile;
};

=======
//src/services/profileService.js
const { findProfileByUID, createOrUpdateProfile } = require("../repositories/profileRepository");
const UserProfile = require("../models/UserProfile");


// Bounding box for Île-de-France (approximate)
const ILE_DE_FRANCE_BOUNDS = {
  minLat: 48.0,
  maxLat: 49.2,
  minLng: 1.4,
  maxLng: 3.4,
};

// services/profileService.js
const getProfile = async (uid) => {
  const profile = await findProfileByUID(uid);
  // Old: if (!profile) throw new Error("Profile not found");
  // New: simply return `null` if not found
  return profile; 
};


>>>>>>> origin/1-featuresloginandsignupfrontend
const saveProfile = async (uid, profileData) => {
  if (profileData.siret && /^\d{14}$/.test(profileData.siret)) {
    profileData.certified = true; // Mark as certified if SIRET is valid
  } else {
    profileData.certified = false; // Uncertified if SIRET is missing/invalid
  }
  return await createOrUpdateProfile(uid, profileData);
};

// Partially update specific fields of the user's profile
const updateProfileField = async (uid, updates) => {
  // Fetch the user's existing profile by UID
  const profile = await findProfileByUID(uid);
  if (!profile) throw new Error("Profile not found");

  // Loop through each key in the updates object
  Object.keys(updates).forEach((key) => {
    if (key === "location" && typeof updates.location === "object") {
      // If the "location" key is being updated, handle subfields
      if ("address" in updates.location) {
        profile.location.address = updates.location.address;
      }
      if ("lat" in updates.location) {
        profile.location.lat = updates.location.lat;
      }
      if ("lng" in updates.location) {
        profile.location.lng = updates.location.lng;
      }
    }  else if (key === "siret") {
      // Minimal format check (14 digits)
      if (!/^\d{14}$/.test(updates.siret)) {
        throw new Error("Invalid SIRET format: must be exactly 14 digits");
      }
      profile.siret = updates.siret;
    }
    else {
      // For all other fields, directly update them
      profile[key] = updates[key];
    }
  });

  // Save the updated profile back to the database
  return await profile.save();
};


<<<<<<< HEAD
const getProfilesNearby = async (lat, lng, radius) => {
  const profiles = await UserProfile.find({
    "location.lat": { $gte: lat - radius, $lte: lat + radius },
    "location.lng": { $gte: lng - radius, $lte: lng + radius },
  });
  return profiles;
};

module.exports = { getProfile, saveProfile, updateProfileField ,getProfilesNearby};
=======
/**
 * Fetch all profiles inside Île-de-France, with optional filters.
 */
const getProfilesInIleDeFrance = async (filters = {}) => {
  const query = {
    "location.lat": { $gte: ILE_DE_FRANCE_BOUNDS.minLat, $lte: ILE_DE_FRANCE_BOUNDS.maxLat },
    "location.lng": { $gte: ILE_DE_FRANCE_BOUNDS.minLng, $lte: ILE_DE_FRANCE_BOUNDS.maxLng },
  };

  // Optional: Filter by specialization if provided
  if (filters.specialization) {
    query.specialization = { $regex: filters.specialization, $options: "i" }; // Case-insensitive
  }

  // Optional: Certified profiles only
  if (filters.certifiedOnly) {
    query.certified = true;
  }

  // Optional: Pagination (limit & skip)
  const limit = filters.limit ? parseInt(filters.limit) : 20; // Default: 20 results
  const skip = filters.skip ? parseInt(filters.skip) : 0;

  return await UserProfile.find(query).limit(limit).skip(skip);
};

module.exports = { getProfile, saveProfile, updateProfileField , getProfilesInIleDeFrance};
>>>>>>> origin/1-featuresloginandsignupfrontend
