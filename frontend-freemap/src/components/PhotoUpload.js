// src/components/PhotoUpload.jsx

import React from "react";

/**
 * PhotoUpload
 * - Shows current profile photo (if any)
 * - Allows user to pick a file to upload
 * - We rely on 'editingField' to decide if we are in "edit mode"
 */
function PhotoUpload({
  profilePhoto,
  editingField,
  onEditClick,
  onCancelEdit,
  onFileChange,
}) {
  return (
    <div className="mb-3">
      <p><strong>Profile Photo:</strong></p>

      {profilePhoto ? (
        <img
          src={profilePhoto}
          alt="Profile"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      ) : (
        <p>No photo uploaded</p>
      )}

      {editingField === "profilePhoto" ? (
        <div>
          <input type="file" onChange={onFileChange} className="form-control my-2" />
          <button className="btn btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="btn btn-link p-0"
          onClick={() => onEditClick("profilePhoto")}
        >
          {profilePhoto ? "Change Photo" : "Upload Photo"}
        </button>
      )}
    </div>
  );
}

export default PhotoUpload;
