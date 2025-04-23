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
const DEPARTEMENTS_BOUNDS = {
  "Paris": {
    minLat: 48.8156, maxLat: 48.9022,
    minLng: 2.2242, maxLng: 2.4699
  },
  "Seine-et-Marne": {
    minLat: 48.345, maxLat: 49.050,
    minLng: 2.400, maxLng: 3.300
  },
  "Yvelines": {
    minLat: 48.693, maxLat: 48.983,
    minLng: 1.780, maxLng: 2.200
  },
  "Essonne": {
    minLat: 48.449, maxLat: 48.750,
    minLng: 2.100, maxLng: 2.450
  },
  "Hauts-de-Seine": {
    minLat: 48.801, maxLat: 48.915,
    minLng: 2.170, maxLng: 2.300
  },
  "Seine-Saint-Denis": {
    minLat: 48.849, maxLat: 48.935,
    minLng: 2.358, maxLng: 2.518
  },
  "Val-de-Marne": {
    minLat: 48.740, maxLat: 48.910,
    minLng: 2.350, maxLng: 2.550
  },
  "Val-d'Oise": {
    minLat: 49.020, maxLat: 49.150,
    minLng: 2.150, maxLng: 2.500
  }
};

// services/profileService.js
const getProfile = async (uid) => {
  const profile = await findProfileByUID(uid);
  // Old: if (!profile) throw new Error("Profile not found");
  // New: simply return `null` if not found
  return profile;
};


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
    } else if (key === "siret") {
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


/**
 * Fetch all profiles inside Île-de-France, with optional filters.
 */
const getProfilesInIleDeFrance = async (filters = {}) => {
  if (filters.departement) {

    const bounds = DEPARTEMENTS_BOUNDS[filters.departement];

    query = {
      "location.lat": { $gte: bounds.minLat, $lte: bounds.maxLat },
      "location.lng": { $gte: bounds.minLng, $lte: bounds.maxLng },
    };

  } else {
    query = {
      "location.lat": { $gte: ILE_DE_FRANCE_BOUNDS.minLat, $lte: ILE_DE_FRANCE_BOUNDS.maxLat },
      "location.lng": { $gte: ILE_DE_FRANCE_BOUNDS.minLng, $lte: ILE_DE_FRANCE_BOUNDS.maxLng },
    };
  }

  // Optional: Filter by specialization if provided
  if (filters.specialization) {
    filters.specialization = Array.isArray(filters.specialization)
      ? filters.specialization
      : [filters.specialization];
    query.$or = filters.specialization.map(spec => ({
      specialization: { $regex: spec, $options: "i" }
    }))
    // query.specialization = { $regex: filters.specialization, $options: "i" }; // Case-insensitive
  }

  // Optional: Certified profiles only
  if (filters.certifiedOnly) {
    query.certified = true;
  }

  // Optional: Pagination (limit & skip)
  const limit = filters.limit ? parseInt(filters.limit) : 200; // Default: 20 results
  const skip = filters.skip ? parseInt(filters.skip) : 0;

  return await UserProfile.find(query).limit(limit).skip(skip);
};

module.exports = { getProfile, saveProfile, updateProfileField, getProfilesInIleDeFrance };
