// src/pages/Profile.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import ProfileContent from "../components/ProfileContent";
import { useProfile } from "../hooks/useProfile";
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useContext(AuthContext);
  const {
    profile,
    loading,
    formData,
    editingField,
    isLocationValid,
    siretValidationStatus,
    handleInputChange,
    handlePartialSave,
    handlePhotoUpload,
    handleSaveFull,
    setEditingField,
  } = useProfile(navigate);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <Navbar
        currentUser={currentUser}
        onSignOut={async () => {
          try {
            await signOut();
            navigate("/signin");
          } catch (error) {
            console.error("Erreur de déconnexion:", error);
          }
        }}
      />
      {/* Container for the main profile content */}
      <div className="container mt-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-outline-primary mb-3 d-inline-flex align-items-center"
        >
          <FaArrowLeft className="me-2" />
          Retour au Tableau de bord
        </button>

        {profile ? (
          <ProfileContent
            profile={profile}
            formData={formData}
            editingField={editingField}
            onEditClick={setEditingField}
            onCancelEdit={() => setEditingField(null)}
            onFileChange={handlePhotoUpload}
            onChange={handleInputChange}
            onPartialSave={handlePartialSave}
            isLocationValid={isLocationValid}
            siretValidationStatus={siretValidationStatus}
          />
        ) : (
          <ProfileForm
            formData={formData}
            onChange={handleInputChange}
            onSaveFull={handleSaveFull}
            isLocationValid={isLocationValid}
            siretValidationStatus={siretValidationStatus}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
