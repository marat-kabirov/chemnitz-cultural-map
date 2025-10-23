import React from "react";
import PlaceItem from "./PlaceItem";

function PlacesList({ places, searchName, searchCategory, setSearchName, setSearchCategory }) {
  return (
    <div>
      <h1>Search</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>

      {places.length === 0 ? (
        <p>No places found</p>
      ) : (
        places.map((place) => <PlaceItem key={place.id} place={place} />)
      )}
    </div>
  );
}

export default PlacesList;
