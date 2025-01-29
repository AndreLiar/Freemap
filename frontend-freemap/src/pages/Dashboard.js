// src/pages/Dashboard.jsx

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import api from "../services/apiService";

import DashboardHeader from "../components/DashboardHeader";
import ProfileView from "../components/ProfileView";
import PhotoUpload from "../components/PhotoUpload";

// Simple function to validate a 14-digit SIRET
const validateSiret = (siret) => {
  if (!siret) {
    return null; // no input => no validation message
  }
  if (/^\d{14}$/.test(siret)) {
    return { valid: true, message: "Valid SIRET format." };
  }
  return { valid: false, message: "SIRET must be exactly 14 digits." };
};

function Dashboard() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Our local, editable state
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    hourlyRate: "",
    description: "",
    location: { address: "", lat: null, lng: null },
    profilePhoto: "",
    siret: "", // new SIRET field
  });

  // For location bounding box
  const [isLocationValid, setIsLocationValid] = useState(true);

  // Which field is in "edit" mode
  const [editingField, setEditingField] = useState(null);

  // Track siret validation
  const [siretValidationStatus, setSiretValidationStatus] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile/me");
        if (data) {
          setProfile(data);

          const safeLocation = {
            address: data.location?.address || "",
            lat: data.location?.lat || null,
            lng: data.location?.lng || null,
          };

          setFormData({
            name: data.name || "",
            specialization: data.specialization || "",
            hourlyRate: data.hourlyRate || "",
            description: data.description || "",
            location: safeLocation,
            profilePhoto: data.profilePhoto || "",
            siret: data.siret || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        alert("Failed to fetch profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  /**
   * handleSignOut
   */
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
      alert("Failed to sign out. Please try again.");
    }
  };

  /**
   * geocodeLocation
   * Called if user changes locationAddress => update lat/lng in real time
   */
  const geocodeLocation = async (address) => {
    if (!address) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, lat: null, lng: null },
      }));
      setIsLocationValid(false);
      return;
    }

    try {
      // bounding around Ile-de-France
      const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=fr&viewbox=1.4,49.2,3.4,48.0&bounded=1&limit=1&q=${encodeURIComponent(
        address
      )}`;
      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const { lat, lon } = data[0];
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            lat: parseFloat(lat),
            lng: parseFloat(lon),
          },
        }));
        setIsLocationValid(true);
      } else {
        setFormData((prev) => ({
          ...prev,
          location: { ...prev.location, lat: null, lng: null },
        }));
        setIsLocationValid(false);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, lat: null, lng: null },
      }));
      setIsLocationValid(false);
    }
  };

  /**
   * handleInputChange
   * - locationAddress => geocode
   * - siret => real-time format check
   */
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "locationAddress") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, address: value },
      }));
      await geocodeLocation(value);
    }
    else if (name === "siret") {
      // Validate SIRET format
      const validation = validateSiret(value);
      setSiretValidationStatus(validation);
      setFormData((prev) => ({ ...prev, siret: value }));
    }
    else {
      // Normal field
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * handlePartialSave
   * Called when user hits "Save" for a single field (like "siret")
   */
  const handlePartialSave = async (field) => {
    // If the user tries to save an empty field (excluding location object)
    if (!formData[field] && field !== "location") {
      alert("Field cannot be empty!");
      return;
    }

    if (field === "location") {
      const { address, lat, lng } = formData.location;
      if (!address || lat == null || lng == null || !isLocationValid) {
        alert("Please enter a valid location in Île-de-France before saving.");
        return;
      }
      try {
        await api.patch("/profile/me", {
          location: { address, lat, lng },
        });
        // Update local profile
        setProfile((prev) => ({
          ...prev,
          location: { address, lat, lng },
        }));
        setEditingField(null);
        alert("Location updated successfully!");
      } catch (err) {
        console.error("Error updating location:", err);
        alert("Failed to update location. Please try again.");
      }
      return;
    }

    if (field === "siret") {
      // If the siret validation failed => block
      if (siretValidationStatus && !siretValidationStatus.valid) {
        alert("Cannot save invalid SIRET. Must be 14 digits.");
        return;
      }
      try {
        await api.patch("/profile/me", { siret: formData.siret });
        // The backend presumably sets `certified = true` if it's valid
        setProfile((prev) => ({
          ...prev,
          siret: formData.siret,
          certified: true, // Or let the next GET /profile refresh it. For immediate UI, you can do this.
        }));
        setEditingField(null);
        alert("SIRET updated successfully!");
      } catch (err) {
        console.error("Error updating SIRET:", err);
        alert("Failed to update SIRET. Please try again.");
      }
      return;
    }

    // For other fields (name, specialization, etc.)
    try {
      await api.patch("/profile/me", { [field]: formData[field] });
      setProfile((prev) => ({
        ...prev,
        [field]: formData[field],
      }));
      setEditingField(null);
      alert("Profile field updated successfully!");
    } catch (error) {
      console.error("Error partial saving:", error);
      alert("Failed to update field. Please try again.");
    }
  };

  /**
   * handlePhotoUpload
   * For uploading a new profile photo
   */
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formDataObj = new FormData();
      formDataObj.append("photo", file);

      const { data: updatedProfile } = await api.post("/profile/me/photo", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(updatedProfile);
      setFormData((prev) => ({
        ...prev,
        profilePhoto: updatedProfile.profilePhoto || "",
      }));
      setEditingField(null);
      alert("Photo uploaded & profile updated!");
    } catch (err) {
      console.error("Photo upload error:", err);
      alert("Failed to upload photo. Please try again.");
    }
  };

  /**
   * handleSaveFull
   * If there's no profile, user can do a full create
   */
  const handleSaveFull = async () => {
    const {
      name,
      specialization,
      hourlyRate,
      description,
      location,
      profilePhoto,
      siret,
    } = formData;

    // Basic checks
    if (!name || !specialization || !hourlyRate || !description || !location.address) {
      alert("All fields (including Location) are required!");
      return;
    }
    if (Number(hourlyRate) <= 0) {
      alert("Hourly rate must be positive.");
      return;
    }
    if (!location.lat || !location.lng || !isLocationValid) {
      alert("Please enter a valid location in Île-de-France.");
      return;
    }

    // Optional: SIRET check
    if (siret) {
      const validation = validateSiret(siret);
      if (!validation.valid) {
        alert("Cannot save invalid SIRET. Must be 14 digits.");
        return;
      }
    }

    try {
      await api.put("/profile/me", {
        name,
        specialization,
        hourlyRate,
        description,
        location,
        profilePhoto,
        siret,
      });
      setProfile({
        name,
        specialization,
        hourlyRate,
        description,
        location,
        profilePhoto,
        siret,
      });
      alert("Profile fully updated successfully!");
    } catch (err) {
      console.error("Error saving full profile:", err);
      alert("Failed to fully update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <DashboardHeader currentUser={currentUser} onSignOut={handleSignOut} />

      {profile ? (
        <>
          <h3>Your Profile</h3>

          {/* Photo */}
          <PhotoUpload
            profilePhoto={profile.profilePhoto}
            editingField={editingField}
            onEditClick={setEditingField}
            onCancelEdit={() => setEditingField(null)}
            onFileChange={handlePhotoUpload}
          />

          {/* Fields (including SIRET, etc.) */}
          <ProfileView
            profile={profile} // Contains "certified" to show the icon
            formData={formData}
            editingField={editingField}
            isLocationValid={isLocationValid}
            siretValidationStatus={siretValidationStatus}
            onEditClick={setEditingField}
            onCancelEdit={() => setEditingField(null)}
            onChange={handleInputChange}
            onPartialSave={handlePartialSave}
          />
        </>
      ) : (
        // If no profile => let user create a full one
        <div>
          <h3>No Profile Found</h3>
          <p>Please complete your profile below:</p>
          {/* Full creation form if you'd like */}
          <button className="btn btn-success" onClick={handleSaveFull}>
            Save Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
