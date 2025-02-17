import React from 'react'

export default function SearchBar() {
  return (
    <div>
        <div className="search-bar">    
            <input type="text" placeholder="Chercher un mot-clé,un poste" />
            <input type="text" placeholder="Lieu" />
            <button type="submit">Search</button>
        </div>
    </div>
  )
}
