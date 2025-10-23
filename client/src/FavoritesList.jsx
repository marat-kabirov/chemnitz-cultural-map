import React, { useState, useEffect, useContext } from "react";
import PlaceItem from "./PlaceItem";
import { FavoritesContext } from "./FavoritesContext";

function FavoritesList() {
  const { favorites, loading, error } = useContext(FavoritesContext);

  const [filteredFavorites, setFilteredFavorites] = useState(favorites);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    setFilteredFavorites(
      favorites.filter((place) => {
        const matchesName = searchName
          ? place.name.toLowerCase().includes(searchName.toLowerCase())
          : true;
        const matchesCategory = searchCategory
          ? (place.category || "").toLowerCase().includes(searchCategory.toLowerCase())
          : true;
        return matchesName && matchesCategory;
      })
    );
  }, [favorites, searchName, searchCategory]);

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Your Favorite Places</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search favorite by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Search favorite by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>

      {filteredFavorites.length === 0 ? (
        <p>No favorite places found</p>
      ) : (
        filteredFavorites.map((place) => (
          <PlaceItem key={place.id} place={place} />
        ))
      )}
    </div>
  );
}

export default FavoritesList;
