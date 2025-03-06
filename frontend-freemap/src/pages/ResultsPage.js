import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import ResultsMapping from "../components/ResultsMapping";

export default function ResultsPage() {
  const [results, setResults] = useState([]);

  return (
    <section>
      <NavBar />
      <SearchBar setResults={setResults} />
      {results.length ? (
        <ResultsMapping results={results} />
      ) : (
        <div class="d-flex justify-content-center m-5">
          <div class="spinner-grow text-info text-center" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </section>
  );
}
