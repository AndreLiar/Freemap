// src/components/LocationMap.jsx

import React, {  useState } from "react";
import illustrationNotFound from "../assets/notFound.png"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import UserProfileView from "./UserProfileView";
// Fix default Marker icon paths in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

/**
 * LocationMap
 * - Renders a Leaflet map if lat/lng exist
 * - Places a marker and popup for the address
 */
function ResultsMapping({ results }) {
  const [selectedResult, setSelectedResult] = useState(null);

  return (
    <div className="mt-3 container">
      {typeof(results)==="string" ? (
        <div className="text-center">
          <img src={illustrationNotFound} className="w-25 h-25" alt="..."></img>
          <p>
         {results}

          </p>
        </div>
      ):(
      <MapContainer
        className="vw-75 vh-75 "
        center={[48.8566, 2.3522]}
        zoom={13}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {results.map((result) => (
          <Marker position={[result.location.lat, result.location.lng]}>
            <Popup  >
              <img src={result.profilePhoto} class="card-img-top  h-50" alt="..." />
              <p className="card-text">
                <h5 className=" text-primary">{result.specialization}</h5>
                {result.hourlyRate} €/h
              </p>
              <button type="button" 
              onClick={() => setSelectedResult(result)}
              className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profilModal">
                Voir le profile
              </button>
            </Popup>
          </Marker>
        ))}
        {/* <Marker position={[lat, lng]}>
          <Popup>{address}</Popup>
          </Marker> */}
      </MapContainer>)}
          {selectedResult && (<UserProfileView result={selectedResult} />)}
    </div>
  );
}

export default ResultsMapping;
