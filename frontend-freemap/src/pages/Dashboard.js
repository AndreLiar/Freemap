import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { currentUser, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="container mt-5">
      <Navbar currentUser={currentUser} onSignOut={handleSignOut} />
      <div className="mt-4">
        <h2>Dashboard</h2>
        <p>Welcome, {currentUser?.email}</p>
        {/* Navigation to Profile Page */}
        <button className="btn btn-primary" onClick={goToProfile}>
          Manage Profile
        </button>
        {/* Additional dashboard-specific content can go here */}
      </div>
    </div>
  );
}

export default Dashboard;
