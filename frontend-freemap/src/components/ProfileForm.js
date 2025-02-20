// src/components/ProfileForm.jsx
import React from "react";
import {
  FaUserPlus,
  FaUser,
  FaBriefcase,
  FaMoneyBillWave,
  FaFileAlt,
  FaMapMarkerAlt,
  FaIdCard,
} from "react-icons/fa";

const ProfileForm = ({
  formData,
  onChange,
  onSaveFull,
  isLocationValid,
  siretValidationStatus,
}) => {
  return (
    <div className="card mb-4 shadow-sm rounded-3">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0 d-inline-flex align-items-center">
          <FaUserPlus className="me-2" />
          Créer votre profil
        </h5>
      </div>
      <div className="card-body">
        <h5 className="card-title">Aucun profil trouvé</h5>
        <p className="card-text">Veuillez compléter votre profil ci-dessous:</p>

        {/* Nom */}
        <div className="mb-3">
          <label className="form-label d-flex align-items-center">
            <FaUser className="me-2 text-secondary" />
            Nom
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={onChange}
            placeholder="Entrez votre nom"
            required
          />
        </div>

        {/* Spécialisation */}
        <div className="mb-3">
          <label className="form-label d-flex align-items-center">
            <FaBriefcase className="me-2 text-secondary" />
            Spécialisation
          </label>
          <input
            type="text"
            name="specialization"
            className="form-control"
            value={formData.specialization}
            onChange={onChange}
            placeholder="Ex: Plombier, Développeur Web..."
            required
          />
        </div>

        {/* Taux Horaire */}
        <div className="mb-3">
          <label className="form-label d-flex align-items-center">
            <FaMoneyBillWave className="me-2 text-secondary" />
            Taux horaire (€)
          </label>
          <input
            type="number"
            name="hourlyRate"
            className="form-control"
            value={formData.hourlyRate}
            onChange={onChange}
            placeholder="Ex: 50"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label d-flex align-items-center">
            <FaFileAlt className="me-2 text-secondary" />
            Description
          </label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={onChange}
            placeholder="Parlez de vos services..."
            required
          />
        </div>

        {/* Adresse */}
        <div className="mb-3">
          <label className="form-label d-flex align-items-center">
            <FaMapMarkerAlt className="me-2 text-secondary" />
            Adresse
          </label>
          <input
            type="text"
            name="locationAddress"
            className="form-control"
            value={formData.location.address}
            onChange={onChange}
            placeholder="Ex: Paris, France"
            required
          />
          {!isLocationValid && (
            <div className="text-danger">
              Adresse invalide ou hors Île-de-France.
            </div>
          )}
          {formData.location.lat && formData.location.lng && (
            <p className="mt-1">
              Lat: {formData.location.lat} | Lng: {formData.location.lng}
            </p>
          )}
        </div>

        {/* SIRET */}
        <div className="mb-3">
          <label className="form-label d-flex align-items-center">
            <FaIdCard className="me-2 text-secondary" />
            SIRET (14 chiffres, optionnel)
          </label>
          <input
            type="text"
            name="siret"
            className="form-control"
            value={formData.siret}
            onChange={onChange}
            placeholder="Ex: 12345678901234"
          />
          {siretValidationStatus && !siretValidationStatus.valid && (
            <div className="text-danger">
              {siretValidationStatus.message}
            </div>
          )}
        </div>

        <button className="btn btn-success" onClick={onSaveFull}>
          Enregistrer le profil
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
