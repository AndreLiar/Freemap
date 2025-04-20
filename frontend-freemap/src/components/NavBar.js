// src/context/NavBar.js
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import logo from "../assets/FREEMAP.png";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ currentUser, onSignOut }) => {
  const [showDropdown, setShowDropdown] = useState(false);
 const navigate = useNavigate();
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    setShowDropdown(false);
    onSignOut();
  };
  const goToProfile = () => {
    navigate("/profile");
  };

  return (

    <nav className="navbar navbar-light bg-white border-bottom shadow-sm px-3 d-flex justify-content-between">
      {/* Left Side: Logo + Brand */}
      <div className="d-flex align-items-center">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" height="40" className="me-2" />
          {/* You can color this text with "text-primary" if you set #238FB7 as your Bootstrap primary color */}

          <span className="fw-bold text-primary fs-4 m-0">FREEMAP</span>
        </Link>
      </div>

      {/* Right Side: User Icon + Dropdown */}
      {!currentUser ?
        (<div>
          <Link to="/signin" className="btn btn-outline-primary  me-4">
            Connexion
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Inscription
          </Link>
        </div>) : (<div className="position-relative">
          <FiUser
            size={28}
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
            className="text-secondary"
          />

          {/* Dropdown Menu */}
          {showDropdown && currentUser && (
            <div
              className="position-absolute bg-white border rounded shadow p-3"
              style={{ top: "50px", right: 0, minWidth: "220px", zIndex: 1000 }}
            >
              
              <p className="mb-1">
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p className="mb-2">
                <strong>Role:</strong> {currentUser.role || "freelance"}
              </p>
              <button
                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" />
                Sign Out
              </button>
              <button
                className="btn btn-outline-primary mt-1 w-100 d-flex align-items-center justify-content-center"
                onClick={goToProfile}
              >
                < FaUserAlt className="me-2" />
                Profil
              </button>
            </div>
          )}
        </div>)
      }
    </nav>
  );
};

export default NavBar;
