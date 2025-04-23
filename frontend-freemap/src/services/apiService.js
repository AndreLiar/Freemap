import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

const api = axios.create({
  baseURL: "https://freemap-backend.onrender.com/api",
});

// Function to get auth token
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// Function to handle errors
const handleApiError = async (error, navigate) => {
  console.error("API Error:", error.response?.data || error.message);
  if (error.response?.status === 401 || error.response?.status === 403) {
    alert("Session expired. Please log in again.");
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  }
  throw error;
};

// Fetch user profile
export const fetchUserProfile = async (navigate) => {
  try {
    const token = await getAuthToken();
    const { data } = await api.get("/profile/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    return handleApiError(error, navigate);
  }
};

// Partial update (for a single field)
export const updateProfileField = async (field, value, navigate) => {
  try {
    const token = await getAuthToken();
    await api.patch(
      "/profile/me",
      { [field]: value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return true;
  } catch (error) {
    return handleApiError(error, navigate);
  }
};
// Create a new room for video calling
export const createRoom = async () => {
  try {
    const token = await getAuthToken();
    const data =await api.post(
      "/visio-calling/create-room",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    console.error("Error creating room:", error.response?.data || error.message);
    return error;
  }
};

// Upload profile photo
export const uploadProfilePhoto = async (file, navigate) => {
  try {
    const token = await getAuthToken();
    const formData = new FormData();
    formData.append("photo", file);
    const { data } = await api.post("/profile/me/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error, navigate);
  }
};

// Create (or fully update) new profile
export const createProfile = async (profileData, navigate) => {
  try {
    const token = await getAuthToken();
    await api.put("/profile/me", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    return handleApiError(error, navigate);
  }
};

export default api;
