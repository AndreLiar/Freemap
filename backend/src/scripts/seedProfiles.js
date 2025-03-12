/**
 * src/scripts/seedProfiles.js
 * ----------------------------------
 * Generates random UserProfile documents in MongoDB
 * for testing the search endpoint in Île-de-France.
 *
 * Uses real locations like Gare de Lyon, Tour Eiffel, Carré Sénart, etc.
 *
 * Default: 30 profiles.
 * You can override by running:
 *    node scripts/seedProfiles.js 50
 */

require("dotenv").config({ path: "../.env" }); // Ensure it loads from the backend root
const mongoose = require("mongoose");
const UserProfile = require("../models/UserProfile");

// Ensure MONGO_URI is loaded
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in .env file");
  process.exit(1);
}

// 📌 Real Locations in Île-de-France
const REAL_LOCATIONS = [
  { address: "Tour Eiffel, Paris", lat: 48.858844, lng: 2.294351 },
  { address: "Gare de Lyon, Paris", lat: 48.844322, lng: 2.374377 },
  { address: "Carré Sénart, Lieusaint", lat: 48.624569, lng: 2.530121 },
  { address: "Corbeil-Essonnes", lat: 48.609432, lng: 2.489041 },
  { address: "La Défense, Puteaux", lat: 48.891991, lng: 2.241727 },
  { address: "Montmartre, Paris", lat: 48.886704, lng: 2.343104 },
  { address: "Stade de France, Saint-Denis", lat: 48.924459, lng: 2.360169 },
  { address: "Versailles, Château de Versailles", lat: 48.804865, lng: 2.120355 },
  { address: "Aéroport Charles de Gaulle", lat: 49.009690, lng: 2.547925 },
  { address: "Fontainebleau", lat: 48.404676, lng: 2.701624 },
];

// 📌 Example arrays for random selection
const NAMES = [
  "Alice", "Bob", "Charlie", "David", "Emma",
  "Fiona", "Georges", "Hugo", "Isabelle", "Jacques",
  "Kevin", "Luc", "Marie", "Nina", "Oscar",
  "Paul", "Quentin", "Rachel", "Sarah", "Thomas"
];
const SPECIALIZATIONS = [
  "Plumber", "Electrician", "Web Developer", "Graphic Designer",
  "Photographer", "Marketing Consultant", "Carpenter", "Chef",
  "Translator", "Fitness Coach"
];
const DESCRIPTIONS = [
  "Expert in my field",
  "20 years of experience",
  "Passionate about quality work",
  "Affordable and reliable service",
  "Professional and friendly",
  "Eager to help clients",
  "High-quality work guaranteed",
  "Flexible schedule",
];

// 🔹 Random selection helper functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random 14-digit SIRET or empty string
 * ~50% chance to have a SIRET.
 */
function randomSiret() {
  return Math.random() < 0.5
    ? Array.from({ length: 14 }, () => randomInt(0, 9)).join("")
    : "";
}

/**
 * Returns a random placeholder image from picsum.photos
 * e.g. "https://picsum.photos/seed/17/200/200"
 */
function randomProfilePhoto(seed) {
  return `https://picsum.photos/seed/${seed}/200/200`;
}

/**
 * Generates a random profile object with real locations.
 */
function generateRandomProfile(i) {
  const name = `${NAMES[randomInt(0, NAMES.length - 1)]} ${i + 1}`;
  const specialization = SPECIALIZATIONS[randomInt(0, SPECIALIZATIONS.length - 1)];
  const description = DESCRIPTIONS[randomInt(0, DESCRIPTIONS.length - 1)];
  const location = REAL_LOCATIONS[randomInt(0, REAL_LOCATIONS.length - 1)];
  const siret = randomSiret();
  const certified = siret.length === 14; // If we have a valid SIRET => certified

  return {
    uid: `testUID_${i + 1}_${Date.now()}`,
    name,
    specialization,
    hourlyRate: randomInt(30, 120), // e.g. 30-120€/hr
    description,
    location,
    profilePhoto: randomProfilePhoto(i + 1),
    siret,
    certified,
  };
}

/**
 * Connects to MongoDB, inserts test profiles, and closes the connection.
 */
async function seedProfiles(numProfiles = 30) {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB.");

    // Optional: Clear existing profiles if you want a clean slate
    await UserProfile.deleteMany({});
    console.log("⚠️  Cleared existing UserProfiles.");

    // Generate & insert profiles
    const profilesToInsert = Array.from({ length: numProfiles }, (_, i) =>
      generateRandomProfile(i)
    );

    await UserProfile.insertMany(profilesToInsert);
    console.log(`✅ Successfully seeded ${numProfiles} profiles in Île-de-France.`);

  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    console.log("🔌 Disconnecting from MongoDB...");
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB.");
    process.exit(0);
  }
}

// Parse CLI argument or default to 30
const numProfiles = process.argv[2] ? parseInt(process.argv[2], 10) : 30;
seedProfiles(numProfiles);
