import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import api from "../services/apiService";

import DashboardHeader from "../components/DashboardHeader";
import ProfileView from "../components/ProfileView";
import PhotoUpload from "../components/PhotoUpload";
import NavBar from "../components/NavBar";

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

  // The user's profile (null if not found)
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Local form state (for both partial updates AND initial creation)
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    hourlyRate: "",
    description: "",
    location: { address: "", lat: null, lng: null },
    profilePhoto: "",
    siret: "",
  });

  // For bounding box geocoding
  const [isLocationValid, setIsLocationValid] = useState(true);
  // Which field is in "edit" mode for partial updates
  const [editingField, setEditingField] = useState(null);
  // Track SIRET format
  const [siretValidationStatus, setSiretValidationStatus] = useState(null);

  // ----------------------------------------
  // 1) FETCH PROFILE (GET /profile/me)
  // ----------------------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) {
        console.error("No authenticated user found.");
        setLoading(false);
        return;
      }

      try {
        const token = await auth.currentUser.getIdToken();
        console.log("Auth Token fetched:", token);

        // Make request with token
        const { data } = await api.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If data === null => no profile => show creation form
        if (data === null) {
          console.log("Profile is null => new user, show creation form");
          setProfile(null);
        } else {
          // Profile found => set it in state
          console.log("Profile found =>", data);
          setProfile(data);

          // Populate formData from fetched profile
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
        console.error(
          "Error fetching profile:",
          error?.response?.data || error.message,
        );
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          alert("Session expired or invalid token. Please log in again.");
          await signOut(auth);
          navigate("/login");
        } else {
          alert("Failed to fetch profile. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

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

  // --------------------------------------------
  // Geocoding the location user typed (Ile-de-France bounding)
  // --------------------------------------------
  const geocodeLocation = async (address) => {
    if (!address) {
      // If empty, reset lat/lng
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, lat: null, lng: null },
      }));
      setIsLocationValid(false);
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=fr&viewbox=1.4,49.2,3.4,48.0&bounded=1&limit=1&q=${encodeURIComponent(
        address,
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
   */
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    // If user typed into the "locationAddress" field => geocode
    if (name === "locationAddress") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, address: value },
      }));
      await geocodeLocation(value);
    } else if (name === "siret") {
      // Validate SIRET format on the fly
      const validation = validateSiret(value);
      setSiretValidationStatus(validation);
      setFormData((prev) => ({ ...prev, siret: value }));
    } else {
      // Normal field (name, specialization, hourlyRate, etc.)
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ----------------------------------------------------
  // PARTIAL UPDATE: handlePartialSave
  // ----------------------------------------------------
  const handlePartialSave = async (field) => {
    if (!auth.currentUser) return;

    if (!formData[field] && field !== "location") {
      alert("Field cannot be empty!");
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken();

      // LOCATION partial update
      if (field === "location") {
        const { address, lat, lng } = formData.location;
        if (!address || lat == null || lng == null || !isLocationValid) {
          alert(
            "Please enter a valid location in Île-de-France before saving.",
          );
          return;
        }
        await api.patch(
          "/profile/me",
          { location: { address, lat, lng } },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setProfile((prev) => ({
          ...prev,
          location: { address, lat, lng },
        }));
        setEditingField(null);
        alert("Location updated successfully!");
        return;
      }

      // SIRET partial update
      if (field === "siret") {
        if (siretValidationStatus && !siretValidationStatus.valid) {
          alert("Cannot save invalid SIRET. Must be 14 digits.");
          return;
        }
        await api.patch(
          "/profile/me",
          { siret: formData.siret },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setProfile((prev) => ({
          ...prev,
          siret: formData.siret,
          certified: true,
        }));
        setEditingField(null);
        alert("SIRET updated successfully!");
        return;
      }

      // For other fields (name, specialization, etc.)
      await api.patch(
        "/profile/me",
        { [field]: formData[field] },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setProfile((prev) => ({
        ...prev,
        [field]: formData[field],
      }));
      setEditingField(null);
      alert("Profile field updated successfully!");
    } catch (error) {
      console.error(
        "Error partial saving:",
        error.response?.data || error.message,
      );
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        alert("Session expired or invalid token. Please log in again.");
        await signOut(auth);
        navigate("/login");
      } else {
        alert("Failed to update field. Please try again.");
      }
    }
  };

  // ---------------------------------------------------
  // PHOTO UPLOAD
  // ---------------------------------------------------
  const handlePhotoUpload = async (e) => {
    if (!auth.currentUser) return;

    const file = e.target.files[0];
    if (!file) return;

    try {
      const token = await auth.currentUser.getIdToken();

      const formDataObj = new FormData();
      formDataObj.append("photo", file);

      const { data: updatedProfile } = await api.post(
        "/profile/me/photo",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProfile(updatedProfile);
      setFormData((prev) => ({
        ...prev,
        profilePhoto: updatedProfile.profilePhoto || "",
      }));
      setEditingField(null);
      alert("Photo uploaded & profile updated!");
    } catch (err) {
      console.error("Photo upload error:", err.response?.data || err.message);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        alert("Session expired or invalid token. Please log in again.");
        await signOut(auth);
        navigate("/login");
      } else {
        alert("Failed to upload photo. Please try again.");
      }
    }
  };

  // ---------------------------------------------------
  // CREATE A NEW PROFILE (SAVE FULL)
  // ---------------------------------------------------
  const handleSaveFull = async () => {
    if (!auth.currentUser) return;

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
    if (
      !name ||
      !specialization ||
      !hourlyRate ||
      !description ||
      !location.address
    ) {
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
    if (siret) {
      const validation = validateSiret(siret);
      if (!validation.valid) {
        alert("Cannot save invalid SIRET. Must be 14 digits.");
        return;
      }
    }

    try {
      const token = await auth.currentUser.getIdToken();
      await api.put(
        "/profile/me",
        {
          name,
          specialization,
          hourlyRate,
          description,
          location,
          profilePhoto,
          siret,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // After creating a new profile, set it in state
      setProfile({
        name,
        specialization,
        hourlyRate,
        description,
        location,
        profilePhoto,
        siret,
      });
      alert("Profile fully created successfully!");
    } catch (err) {
      console.error(
        "Error saving full profile:",
        err.response?.data || err.message,
      );
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        alert("Session expired or invalid token. Please log in again.");
        await signOut(auth);
        navigate("/login");
      } else {
        alert("Failed to fully create profile. Please try again.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <NavBar currentUser={currentUser} />
      <div className="container mt-5">
        <DashboardHeader currentUser={currentUser} onSignOut={handleSignOut} />

        {profile ? (
          <>
            <h3>Your Profile</h3>

            {/* Photo Section */}
            <PhotoUpload
              profilePhoto={profile.profilePhoto}
              editingField={editingField}
              onEditClick={setEditingField}
              onCancelEdit={() => setEditingField(null)}
              onFileChange={handlePhotoUpload}
            />

            {/* Existing Profile Fields (partial update) */}
            <ProfileView
              profile={profile}
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
          // **************************************************
          // IF NO PROFILE => SHOW "CREATION" FORM
          // **************************************************
          <div>
            <h3>No Profile Found</h3>
            <p>Please complete your profile below:</p>

            {/* Full creation fields */}
            {/* Name */}
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Specialization */}
            <div className="mb-3">
              <label>Specialization</label>
              <input
                type="text"
                name="specialization"
                className="form-control"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="e.g. Plumber, Web Developer..."
                required
              />
            </div>

            {/* Hourly Rate */}
            <div className="mb-3">
              <label>Hourly Rate (€)</label>
              <input
                type="number"
                name="hourlyRate"
                className="form-control"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                placeholder="e.g. 50"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us about your services..."
                required
              />
            </div>

            {/* Location Address */}
            <div className="mb-3">
              <label>Location Address</label>
              <input
                type="text"
                name="locationAddress"
                className="form-control"
                value={formData.location.address}
                onChange={handleInputChange}
                placeholder="e.g. Paris, France"
                required
              />
              {!isLocationValid && (
                <div className="text-danger">
                  Invalid or outside Île-de-France.
                </div>
              )}
              {/* If lat/lng are found, show them */}
              {formData.location.lat && formData.location.lng && (
                <p className="mt-1">
                  Lat: {formData.location.lat} | Lng: {formData.location.lng}
                </p>
              )}
            </div>

            {/* SIRET (optional) */}
            <div className="mb-3">
              <label>SIRET (14 digits, optional)</label>
              <input
                type="text"
                name="siret"
                className="form-control"
                value={formData.siret}
                onChange={handleInputChange}
                placeholder="e.g. 12345678901234"
              />
              {siretValidationStatus && !siretValidationStatus.valid && (
                <div className="text-danger">
                  {siretValidationStatus.message}
                </div>
              )}
            </div>

            <button className="btn btn-success" onClick={handleSaveFull}>
              Save Profile
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
