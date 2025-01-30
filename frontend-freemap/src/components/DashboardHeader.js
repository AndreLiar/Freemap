// src/components/DashboardHeader.jsx

import React from "react";

/**
 * DashboardHeader
 * - Displays a welcome title
 * - Shows user's email & role
 * - Has a "Sign Out" button
 */
function DashboardHeader({ currentUser, onSignOut }) {
  return (
    <div className="mb-4">
      <h2>Welcome to the Dashboard</h2>

      {currentUser && (
        <div>
          <p>Email: {currentUser.email}</p>
          <p>Role: {currentUser.role || "freelance"}</p>
        </div>
      )}

      <button className="btn btn-danger mt-3" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default DashboardHeader;
