// src/components/LocationAutocomplete.jsx

import React, { useState, useEffect } from "react";

function LocationAutocomplete({
  initialAddress = "",
  onSelectLocation,
  countryCode = "fr"
}) {
  const [query, setQuery] = useState(initialAddress);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // We'll fix the bounding box around Ile-de-France
  // (left=1.4, top=49.2, right=3.4, bottom=48.0)
  // &bounded=1
  const ILE_DE_FRANCE_PARAMS = "&viewbox=1.4,49.2,3.4,48.0&bounded=1";

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        // Nominatim with bounding box, limit=5
        // This might skip partial matches that don't strictly appear in bounding results
        const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=${countryCode}${ILE_DE_FRANCE_PARAMS}&limit=5&q=${encodeURIComponent(
          query
        )}`;
        const res = await fetch(url);
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Nominatim autocomplete error:", err);
        setSuggestions([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query, countryCode]);

  const handleSelectSuggestion = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    const address = place.display_name;

    // Pass it up
    onSelectLocation({ lat, lon, address });
    // Fill input with the chosen address
    setQuery(address);
    setShowDropdown(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Type city or address (within Ile-de-France)"
      />

      {showDropdown && suggestions.length > 0 && (
        <ul
          className="list-group"
          style={{
            position: "absolute",
            zIndex: 1000,
            width: "100%",
            top: "38px"
          }}
        >
          {suggestions.map((sug) => (
            <li
              key={sug.place_id}
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectSuggestion(sug)}
            >
              {sug.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationAutocomplete;
