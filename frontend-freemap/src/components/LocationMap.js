// src/components/LocationMap.jsx

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Marker icon paths in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

/**
 * LocationMap
 * - Renders a Leaflet map if lat/lng exist
 * - Places a marker and popup for the address
 */
function LocationMap({ lat, lng, address }) {
  if (!lat || !lng) {
    return null; // No map if we have no valid coords
  }

  return (
    <div className="mb-3">
      <h5>Map Preview</h5>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[lat, lng]}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LocationMap;
