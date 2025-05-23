import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import ResultsMapping from "../components/ResultsMapping";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
export default function ResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const { currentUser, signOut } = useContext(AuthContext);
  const location = useLocation();
  useEffect(() => {
    if (results.length) {
      return;
    }
    const myData = location.state || [];
    setResults(myData.data);
  }, [setResults, location.state]);
  return (
    <section>
      <NavBar
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
      <SearchBar setResults={setResults} />
      {results.length ? (
       <ResultsMapping results={results} />
      ) : (
        <div class="d-flex justify-content-center m-5">
          <div class="spinner-grow text-info text-center" role="status">
            <span class="visually-hidden">Loading... {results.length}</span>
          </div>
            {results}
        </div>
      )}
    </section>
  );
}
