import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  if (!currentUser) {
    return <Navigate to="/signin" />; // Redirect to sign-in if not authenticated
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
