// src/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function LandingPage() {
  return (
    <section>
      <NavBar />
      <div className="container text-center mt-5">
        <h1>Welcome to Our Platform</h1>
        <p>Your journey begins here. Please sign up or sign in to continue.</p>
        <div className="mt-3">
          <Link to="/signup" className="btn btn-primary me-2">
            Sign Up
          </Link>
          <Link to="/signin" className="btn btn-secondary">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
