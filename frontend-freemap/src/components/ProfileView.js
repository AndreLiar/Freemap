// src/components/ProfileView.jsx

import React from "react";
import LocationMap from "./LocationMap";
import LocationAutocomplete from "./LocationAutocomplete";
// Example: Using React Bootstrap Icons or any other library
import { BsCheckCircleFill } from "react-icons/bs";

/**
 * ProfileView
 * - Displays and edits the user's fields:
 *   - name, specialization, hourlyRate, description, siret, location
 * - Shows a "certified" icon if `profile.certified === true`
 */
function ProfileView({
  profile,                // Full profile from backend (includes .certified, etc.)
  formData,              // The "live" editable state (like name, siret, etc.)
  editingField,          // Which field is in "edit" mode
  isLocationValid,       // For location bounding checks
  siretValidationStatus, // { valid: boolean, message: string } or null
  onEditClick,           // (fieldName) => void
  onCancelEdit,          // () => void
  onChange,              // handle input changes
  onPartialSave,         // (fieldName) => partial update
}) {
  const {
    name,
    specialization,
    hourlyRate,
    description,
    siret,
    location,
  } = formData;

  // Called if user picks an address from the autocomplete
  const handleSelectLocation = ({ lat, lon, address }) => {
    onChange({ target: { name: "locationAddress", value: address } });
    onChange({ target: { name: "locationLat", value: lat } });
    onChange({ target: { name: "locationLng", value: lon } });
  };

  return (
    <>
      {/* NAME + Certified Badge if profile.certified is true */}
      <div className="mb-3">
        <p>
          <strong>Name:</strong> {name}{" "}
          {profile.certified && (
            <BsCheckCircleFill
              className="text-primary ms-2"
              title="Certified Account"
              style={{ fontSize: "1.2rem" }}
            />
          )}
        </p>
        {editingField === "name" ? (
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control my-2"
              required
            />
            <button
              className="btn btn-success me-2"
              onClick={() => onPartialSave("name")}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn btn-link p-0"
            onClick={() => onEditClick("name")}
          >
            Edit Name
          </button>
        )}
      </div>

      {/* SPECIALIZATION */}
      <div className="mb-3">
        <p><strong>Specialization:</strong> {specialization}</p>
        {editingField === "specialization" ? (
          <div>
            <input
              type="text"
              name="specialization"
              value={specialization}
              onChange={onChange}
              className="form-control my-2"
              required
            />
            <button
              className="btn btn-success me-2"
              onClick={() => onPartialSave("specialization")}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn btn-link p-0"
            onClick={() => onEditClick("specialization")}
          >
            Edit Specialization
          </button>
        )}
      </div>

      {/* HOURLY RATE */}
      <div className="mb-3">
        <p><strong>Hourly Rate:</strong> €{hourlyRate}</p>
        {editingField === "hourlyRate" ? (
          <div>
            <input
              type="number"
              name="hourlyRate"
              value={hourlyRate}
              onChange={onChange}
              className="form-control my-2"
              required
            />
            <button
              className="btn btn-success me-2"
              onClick={() => onPartialSave("hourlyRate")}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn btn-link p-0"
            onClick={() => onEditClick("hourlyRate")}
          >
            Edit Hourly Rate
          </button>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="mb-3">
        <p><strong>Description:</strong> {description}</p>
        {editingField === "description" ? (
          <div>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              className="form-control my-2"
              required
            />
            <button
              className="btn btn-success me-2"
              onClick={() => onPartialSave("description")}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn btn-link p-0"
            onClick={() => onEditClick("description")}
          >
            Edit Description
          </button>
        )}
      </div>

      {/* SIRET */}
      <div className="mb-3">
        <p><strong>SIRET:</strong> {siret || "Not specified"}</p>
        {editingField === "siret" ? (
          <div>
            <input
              type="text"
              name="siret"
              value={siret}
              onChange={onChange}
              className="form-control my-2"
              placeholder="Enter 14-digit SIRET"
            />
            {/* Show immediate validation feedback if any */}
            {siretValidationStatus && (
              <div
                className={`mb-2 ${
                  siretValidationStatus.valid ? "text-success" : "text-danger"
                }`}
              >
                {siretValidationStatus.message}
              </div>
            )}
            <button
              className="btn btn-success me-2"
              onClick={() => onPartialSave("siret")}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn btn-link p-0"
            onClick={() => onEditClick("siret")}
          >
            Edit SIRET
          </button>
        )}
      </div>

      {/* LOCATION */}
      <div className="mb-3">
        <p>
          <strong>Location Address:</strong> {location.address || "Not specified"}
        </p>
        {editingField === "location" ? (
          <div>
            <LocationAutocomplete
              initialAddress={location.address}
              onSelectLocation={handleSelectLocation}
            />

            {!isLocationValid && (
              <div className="text-danger mb-2">
                Invalid or outside Île-de-France.
              </div>
            )}
            <button
              className="btn btn-success me-2"
              onClick={() => onPartialSave("location")}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
            <p className="mt-2">
              Lat: {location.lat ?? "N/A"} | Lng: {location.lng ?? "N/A"}
            </p>
          </div>
        ) : (
          <button
            className="btn btn-link p-0"
            onClick={() => onEditClick("location")}
          >
            Edit Location
          </button>
        )}
      </div>

      {/* MAP PREVIEW */}
      <LocationMap
        lat={location.lat}
        lng={location.lng}
        address={location.address}
      />
    </>
  );
}

export default ProfileView;
