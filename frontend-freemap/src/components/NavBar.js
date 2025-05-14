import React, { useState, useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import logo from "../assets/FREEMAP.png";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ currentUser, onSignOut }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    setShowDropdown(false);
    onSignOut();
  };

  const goToProfile = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  const closeNav = () => setIsNavOpen(false);

  // Fermer dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-3">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img src={logo} alt="Logo" height="40" className="me-2" />
        <span className="fw-bold text-primary fs-4 m-0">FREEMAP</span>
      </Link>

      {/* Burger Button */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-label="Toggle navigation"
        // style={{ color: "blue" }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse justify-content-end ${isNavOpen ? "show" : ""}`}>
        {!currentUser ? (
          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2">
            <Link to="/signin" className="btn btn-outline-primary me-lg-2 w-100 w-lg-auto" onClick={closeNav}>
              Connexion
            </Link>
            <Link to="/signup" className="btn btn-primary w-100 w-lg-auto" onClick={closeNav}>
              Inscription
            </Link>
          </div>
        ) : (
          <div className="position-relative" ref={dropdownRef}>
            <FiUser
              size={28}
              onClick={toggleDropdown}
              style={{ cursor: "pointer" }}
              className="text-secondary"
            />
            {showDropdown && (
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
                  <FaUserAlt className="me-2" />
                  Profil
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
