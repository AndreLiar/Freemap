// src/components/ProfileView.jsx
import React from "react";
import LocationAutocomplete from "./LocationAutocomplete";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  FaUser,
  FaBriefcase,
  FaMoneyBillWave,
  FaFileAlt,
  FaIdCard,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

function ProfileView({
  profile,
  formData,
  editingField,
  isLocationValid,
  siretValidationStatus,
  onEditClick,
  onCancelEdit,
  onChange,
  onPartialSave,
}) {
  const {
    name,
    specialization,
    hourlyRate,
    description,
    siret,
    location,
  } = formData;

  // Handle new location from autocomplete
  const handleSelectLocation = ({ lat, lon, address }) => {
    onChange({ target: { name: "locationAddress", value: address } });
    onChange({ target: { name: "locationLat", value: lat } });
    onChange({ target: { name: "locationLng", value: lon } });
  };

  // Reusable for Save/Cancel buttons
  const renderEditActions = (fieldName) => (
    <div className="mt-2">
      <button
        className="btn btn-success me-2 d-inline-flex align-items-center"
        onClick={() => onPartialSave(fieldName)}
      >
        <FaCheck className="me-1" />
        Enregistrer
      </button>
      <button
        className="btn btn-secondary d-inline-flex align-items-center"
        onClick={onCancelEdit}
      >
        <FaTimes className="me-1" />
        Annuler
      </button>
    </div>
  );

  return (
    <>
      {/* NOM + Badge si certifié */}
      <div className="mb-3">
        <p>
          <FaUser className="me-2 text-secondary" />
          <strong>Nom:</strong> {name}{" "}
          {profile.certified && (
            <BsCheckCircleFill
              className="text-primary ms-2"
              title="Compte certifié"
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
              className="form-control"
              required
            />
            {renderEditActions("name")}
          </div>
        ) : (
          <button
            className="btn btn-link p-0 d-inline-flex align-items-center"
            onClick={() => onEditClick("name")}
          >
            <FaPencilAlt className="me-1" />
            Modifier
          </button>
        )}
      </div>

      {/* SPÉCIALISATION */}
      <div className="mb-3">
        <p>
          <FaBriefcase className="me-2 text-secondary" />
          <strong>Spécialisation:</strong> {specialization}
        </p>
        {editingField === "specialization" ? (
          <div>
            <input
              type="text"
              name="specialization"
              value={specialization}
              onChange={onChange}
              className="form-control"
              required
            />
            {renderEditActions("specialization")}
          </div>
        ) : (
          <button
            className="btn btn-link p-0 d-inline-flex align-items-center"
            onClick={() => onEditClick("specialization")}
          >
            <FaPencilAlt className="me-1" />
            Modifier
          </button>
        )}
      </div>

      {/* TAUX HORAIRE */}
      <div className="mb-3">
        <p>
          <FaMoneyBillWave className="me-2 text-secondary" />
          <strong>Taux horaire:</strong> €{hourlyRate}
        </p>
        {editingField === "hourlyRate" ? (
          <div>
            <input
              type="number"
              name="hourlyRate"
              value={hourlyRate}
              onChange={onChange}
              className="form-control"
              required
            />
            {renderEditActions("hourlyRate")}
          </div>
        ) : (
          <button
            className="btn btn-link p-0 d-inline-flex align-items-center"
            onClick={() => onEditClick("hourlyRate")}
          >
            <FaPencilAlt className="me-1" />
            Modifier
          </button>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="mb-3">
        <p>
          <FaFileAlt className="me-2 text-secondary" />
          <strong>Description:</strong> {description}
        </p>
        {editingField === "description" ? (
          <div>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              className="form-control"
              required
            />
            {renderEditActions("description")}
          </div>
        ) : (
          <button
            className="btn btn-link p-0 d-inline-flex align-items-center"
            onClick={() => onEditClick("description")}
          >
            <FaPencilAlt className="me-1" />
            Modifier
          </button>
        )}
      </div>

      {/* SIRET */}
      <div className="mb-3">
        <p>
          <FaIdCard className="me-2 text-secondary" />
          <strong>SIRET:</strong> {siret || "Non spécifié"}
        </p>
        {editingField === "siret" ? (
          <div>
            <input
              type="text"
              name="siret"
              value={siret}
              onChange={onChange}
              className="form-control"
              placeholder="14 chiffres"
            />
            {siretValidationStatus && (
              <div
                className={`mb-2 ${
                  siretValidationStatus.valid ? "text-success" : "text-danger"
                }`}
              >
                {siretValidationStatus.message}
              </div>
            )}
            {renderEditActions("siret")}
          </div>
        ) : (
          <button
            className="btn btn-link p-0 d-inline-flex align-items-center"
            onClick={() => onEditClick("siret")}
          >
            <FaPencilAlt className="me-1" />
            Modifier
          </button>
        )}
      </div>

      {/* ADRESSE (mais pas la carte) */}
      <div className="mb-3">
        <p>
          <FaMapMarkerAlt className="me-2 text-secondary" />
          <strong>Adresse:</strong> {location.address || "Non spécifiée"}
        </p>
        {editingField === "location" ? (
          <div>
            <LocationAutocomplete
              initialAddress={location.address}
              onSelectLocation={handleSelectLocation}
            />
            {!isLocationValid && (
              <div className="text-danger mb-2">
                Adresse invalide ou hors Île-de-France.
              </div>
            )}
            {renderEditActions("location")}
            <p className="mt-2">
              Lat: {location.lat ?? "N/A"} | Lng: {location.lng ?? "N/A"}
            </p>
          </div>
        ) : (
          <button
            className="btn btn-link p-0 d-inline-flex align-items-center"
            onClick={() => onEditClick("location")}
          >
            <FaPencilAlt className="me-1" />
            Modifier
          </button>
        )}
      </div>
    </>
  );
}

export default ProfileView;
