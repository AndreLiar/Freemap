import React from "react";
import LocationAutocomplete from "./LocationAutocomplete";
import api from "../services/apiService";

export default function SearchBar({ setResults }) {
  const [lat, setLat] = React.useState("");
  const [lon, setLon] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value); // Met à jour l'état avec la valeur de l'input
  };
  const handleSelectLocation = ({ lat, lon, address }) => {
    setLat(lat);
    setLon(lon);
    setAddress(address);
    // onChange({ target: { name: "locationAddress", value: address } });
    // onChange({ target: { name: "locationLat", value: lat } });
    // onChange({ target: { name: "locationLng", value: lon } });
  };
  const handleSubmit = async () => {
    const result = await api.get("/profile/ile-de-france");
    if (result.data) {
      // console.log(result.data);
      // isResults=result.data;
      setResults(result.data);
    }
    return;
  };
  return (
    <div className="searchBar  p-5 ">
      <div className="container bg-white p-3 rounded">
        <div className=" row  ">
          <div className="col-5">
            <input
              type="text"
              class="form-control"
              placeholder="Chercher un mot-clé,un poste"
              handleChange={handleChange}
            />
          </div>
          <div className="col-5">
            <LocationAutocomplete
              initialAddress=""
              onSelectLocation={handleSelectLocation}
              countryCode="fr"
            />
          </div>
          <div className="col-2">
            <button
              type="submit"
              class="btn btn-primary mb-3 w-100"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <a href="#">Filtres</a>
        </div>
      </div>
    </div>
  );
}
