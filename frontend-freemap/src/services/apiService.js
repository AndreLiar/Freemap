import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5001/api", // Your backend URL
});

// Add a request interceptor to include the Firebase token
api.interceptors.request.use(async (config) => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve the user info from localStorage
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
