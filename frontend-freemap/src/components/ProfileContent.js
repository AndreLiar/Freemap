// src/components/ProfileContent.jsx
import React from "react";
import PhotoUpload from "./PhotoUpload";
import ProfileView from "./ProfileView";
import MapCard from "./MapCard";

const ProfileContent = ({
  profile,
  formData,
  editingField,
  onEditClick,
  onCancelEdit,
  onFileChange,
  onChange,
  onPartialSave,
  isLocationValid,
  siretValidationStatus,
}) => {
  return (
    <>
      {/* Card 1: Informations Personnelles */}
      <div className="card mb-4 shadow-sm rounded-3">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Informations Personnelles</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {/* Left column: Profile photo */}
            <div className="col-md-4 mb-3">
              <PhotoUpload
                profilePhoto={profile.profilePhoto}
                editingField={editingField}
                onEditClick={onEditClick}
                onCancelEdit={onCancelEdit}
                onFileChange={onFileChange}
              />
            </div>
            {/* Right column: Profile details */}
            <div className="col-md-8">
              <ProfileView
                profile={profile}
                formData={formData}
                editingField={editingField}
                isLocationValid={isLocationValid}
                siretValidationStatus={siretValidationStatus}
                onEditClick={onEditClick}
                onCancelEdit={onCancelEdit}
                onChange={onChange}
                onPartialSave={onPartialSave}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Mes Adresses (Map) */}
      <MapCard
        lat={formData.location.lat}
        lng={formData.location.lng}
        address={formData.location.address}
      />
    </>
  );
};

export default ProfileContent;
