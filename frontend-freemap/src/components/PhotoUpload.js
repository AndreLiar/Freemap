// src/components/PhotoUpload.jsx
import React from "react";
import { FaCamera } from "react-icons/fa";

function PhotoUpload({
  profilePhoto,
  editingField,
  onEditClick,
  onCancelEdit,
  onFileChange,
}) {
  return (
    <div className="mb-3">
      <p className="fw-bold">
        <FaCamera className="me-2 text-secondary" />
        Photo de profil
      </p>

      {profilePhoto ? (
        <img
          src={profilePhoto}
          alt="Profile"
          className="img-fluid rounded-circle mb-2"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      ) : (
        <p>Aucune photo</p>
      )}

      {editingField === "profilePhoto" ? (
        <div>
          <input
            type="file"
            onChange={onFileChange}
            className="form-control my-2"
          />
          <button className="btn btn-secondary" onClick={onCancelEdit}>
            Annuler
          </button>
        </div>
      ) : (
        <button
          className="btn btn-link p-0"
          onClick={() => onEditClick("profilePhoto")}
        >
          {profilePhoto ? "Changer la photo" : "Télécharger une photo"}
        </button>
      )}
    </div>
  );
}

export default PhotoUpload;
