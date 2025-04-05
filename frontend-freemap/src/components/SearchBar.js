import React, { useState } from "react";
import api from "../services/apiService";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ setResults }) {
  
  const [departement, setDepartement] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleChange = async (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value); // Met à jour l'état avec la valeur de l'input
  };
  const handleSelectLocation = async(e) => {
    setDepartement(e.target.value);
  };
  const handleSubmit = async () => {
    const result = await api.get("/profile/ile-de-france", {
      params: {
        specialization: searchText,
        departement: departement,
      }
    });
    if (result.data) {
      // console.log(result.data);
      // isResults=result.data;
      setResults(result.data);
      const data=result.data;
      navigate("/results", { state: { data } });
    }
    return;
  };
  return (
    <div className="searchBar  p-5 h-100 ">
      <h1 className="text-center text-white mb-3">Découvrez les meilleurs freelances sur notre plateforme</h1>
      <div className="container bg-white p-3  rounded">
        <div className=" row  ">
          <div className="col-5">
            <input
              type="text"
              class="form-control"
             
              placeholder="Chercher un mot-clé,un poste"
              onChange={handleChange}
            />
          </div>
          <div className="col-5">
            <select class="form-select" id="department" name="department" onChange={handleSelectLocation}>
              <option value="">Selectionne un département</option>
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
