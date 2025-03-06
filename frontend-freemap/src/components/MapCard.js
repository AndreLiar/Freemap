// src/components/MapCard.jsx
import React from "react";
import LocationMap from "./LocationMap";

const MapCard = ({ lat, lng, address }) => {
  return (
    <div className="card mb-4 shadow-sm rounded-3">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Mes Adresses</h5>
      </div>
      <div className="card-body">
        <p>
          <strong>Adresse actuelle:</strong>{" "}
          {address ? address : "Non spécifiée"}
        </p>
        {/* Only show the map if lat/lng are valid */}
        <LocationMap lat={lat} lng={lng} address={address} />
      </div>
    </div>
  );
};

export default MapCard;
