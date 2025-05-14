import React, { useState } from "react";
import api from "../services/apiService";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ setResults }) {
  const [departement, setDepartement] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectLocation = (e) => {
    setDepartement(e.target.value);
  };

  const handleSubmit = async () => {
    const result = await api.get("/profile/ile-de-france", {
      params: {
        specialization: searchText,
        departement: departement,
      },
    });
    if (result.data) {
      setResults(result.data);
      navigate("/results", { state: { data: result.data } });
    }
  };

  return (
    <div className="searchBar p-4 h-100">
      <h1 className="text-center text-white mb-4">
        Découvrez les meilleurs freelances en îles-de-france sur notre plateforme
      </h1>

      <div className="container-fluid d-flex justify-content-center">
        <div className="bg-white p-4 rounded shadow w-100 ">
          <div className="row gy-3 gx-3 justify-content-center">
            <div className="col-12 col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Chercher un mot-clé, un poste"
                onChange={handleChange}
                value={searchText}
              />
            </div>

            <div className="col-12 col-md-5">
              <select
                className="form-select"
                id="department"
                name="department"
                onChange={handleSelectLocation}
                value={departement}
              >
                <option value="">Sélectionne un département</option>
                <option value="Paris">Paris (75)</option>
                <option value="Seine-et-Marne">Seine-et-Marne (77)</option>
                <option value="Yvelines">Yvelines (78)</option>
                <option value="Essonne">Essonne (91)</option>
                <option value="Hauts-de-Seine">Hauts-de-Seine (92)</option>
                <option value="Seine-Saint-Denis">Seine-Saint-Denis (93)</option>
                <option value="Val-de-Marne">Val-de-Marne (94)</option>
                <option value="Val-d'Oise">Val-d'Oise (95)</option>
              </select>
            </div>

            <div className="col-12 col-md-2 d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
