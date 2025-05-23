// src/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Our Platform</h1>
      <p>Your journey begins here. Please sign up or sign in to continue.</p>
      <div className="mt-3">
        <Link to="/signup" className="btn btn-primary me-2">
          Sign Up
        </Link>
        <Link to="/signin" className="btn btn-secondary">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
