const UserProfile = require("../models/UserProfile");

const findProfileByUID = async (uid) => {
  return await UserProfile.findOne({ uid });
};

const createOrUpdateProfile = async (uid, profileData) => {
  return await UserProfile.findOneAndUpdate(
    { uid },
    profileData,
    { new: true, upsert: true }
  );
};

module.exports = { findProfileByUID, createOrUpdateProfile };
