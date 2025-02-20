import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  fetchUserProfile,
  updateProfileField,
  uploadProfilePhoto,
  createProfile,
} from "../services/apiService";

// Simple function to validate a 14-digit SIRET
const validateSiret = (siret) => {
  if (!siret) return null;
  if (/^\d{14}$/.test(siret)) {
    return { valid: true, message: "Valid SIRET format." };
  }
  return { valid: false, message: "SIRET must be exactly 14 digits." };
};

export const useProfile = (navigate) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    hourlyRate: "",
    description: "",
    location: { address: "", lat: null, lng: null },
    profilePhoto: "",
    siret: "",
  });
  const [isLocationValid, setIsLocationValid] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [siretValidationStatus, setSiretValidationStatus] = useState(null);

  // Geocode location using OpenStreetMap
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
      const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=fr&viewbox=1.4,49.2,3.4,48.0&bounded=1&limit=1&q=${encodeURIComponent(address)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const { lat, lon } = data[0];
        setFormData((prev) => ({
          ...prev,
          location: { ...prev.location, lat: parseFloat(lat), lng: parseFloat(lon) },
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

  // Input change handler
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === "locationAddress") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, address: value },
      }));
      await geocodeLocation(value);
    } else if (name === "siret") {
      const validation = validateSiret(value);
      setSiretValidationStatus(validation);
      setFormData((prev) => ({ ...prev, siret: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Partial update handler for a given field
  const handlePartialSave = async (field) => {
    if (!auth.currentUser) return;
    if (!formData[field] && field !== "location") {
      alert("Field cannot be empty!");
      return;
    }
    try {
      if (field === "location") {
        const { address, lat, lng } = formData.location;
        if (!address || lat == null || lng == null || !isLocationValid) {
          alert("Please enter a valid location in Île-de-France before saving.");
          return;
        }
        await updateProfileField("location", { address, lat, lng }, navigate);
        setProfile((prev) => ({ ...prev, location: { address, lat, lng } }));
        setEditingField(null);
        alert("Location updated successfully!");
        return;
      }
      if (field === "siret") {
        if (siretValidationStatus && !siretValidationStatus.valid) {
          alert("Cannot save invalid SIRET. Must be 14 digits.");
          return;
        }
        await updateProfileField("siret", formData.siret, navigate);
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
      await updateProfileField(field, formData[field], navigate);
      setProfile((prev) => ({ ...prev, [field]: formData[field] }));
      setEditingField(null);
      alert("Profile field updated successfully!");
    } catch (error) {
      console.error("Error partial saving:", error);
    }
  };

  // Photo upload handler
  const handlePhotoUpload = async (e) => {
    if (!auth.currentUser) return;
    const file = e.target.files[0];
    if (!file) return;
    try {
      const updatedProfile = await uploadProfilePhoto(file, navigate);
      setProfile(updatedProfile);
      setFormData((prev) => ({
        ...prev,
        profilePhoto: updatedProfile.profilePhoto || "",
      }));
      setEditingField(null);
      alert("Photo uploaded & profile updated!");
    } catch (error) {
      console.error("Photo upload error:", error);
    }
  };

  // Full profile save handler for creating a new profile
  const handleSaveFull = async () => {
    if (!auth.currentUser) return;
    const { name, specialization, hourlyRate, description, location, profilePhoto, siret } = formData;
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
    if (siret) {
      const validation = validateSiret(siret);
      if (!validation.valid) {
        alert("Cannot save invalid SIRET. Must be 14 digits.");
        return;
      }
    }
    try {
      await createProfile({ name, specialization, hourlyRate, description, location, profilePhoto, siret }, navigate);
      setProfile({ name, specialization, hourlyRate, description, location, profilePhoto, siret });
      alert("Profile fully created successfully!");
    } catch (error) {
      console.error("Error saving full profile:", error);
    }
  };

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!auth.currentUser) {
        console.error("No authenticated user found.");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchUserProfile(navigate);
        if (data === null) {
          console.log("Profile is null => new user, show creation form");
          setProfile(null);
        } else {
          console.log("Profile found =>", data);
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
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  return {
    profile,
    loading,
    formData,
    editingField,
    isLocationValid,
    siretValidationStatus,
    handleInputChange,
    handlePartialSave,
    handlePhotoUpload,
    handleSaveFull,
    setEditingField,
  };
};
