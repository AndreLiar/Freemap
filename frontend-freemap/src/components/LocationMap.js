// src/components/LocationMap.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Marker icon paths in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// 👇 Sub-component to fix sizing inside Bootstrap modals
const ResizeFixer = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200); // allow time for modal to open
  }, [map]);
  return null;
};

/**
 * LocationMap Component
 */
function LocationMap({ lat, lng, address }) {
  if (!lat || !lng) return null;

  return (
    <div className="mb-3">
      <h5 className="mb-2">Map Preview</h5>
      <div className="w-100" style={{ height: "300px" }}>
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }} // 🟢 critical for full sizing
        >
          <ResizeFixer />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[lat, lng]}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default LocationMap;