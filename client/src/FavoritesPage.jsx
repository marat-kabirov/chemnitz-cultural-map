import React, { useContext } from "react";
import PlaceItem from "./PlaceItem";
import { FavoritesContext } from "./FavoritesContext";

import "./FavoritesPage.css";

function FavoritesPage() {
  const { favorites, loading, error } = useContext(FavoritesContext);

  if (loading) return <p className="favorites-status">Loading favorites...</p>;
  if (error) return <p className="favorites-status error">Error loading favorites: {error}</p>;
  if (favorites.length === 0) return <p className="favorites-status">No favorite places yet.</p>;

  return (
    <div className="favorites-page-container">
      <h2 className="favorites-title">Favorites</h2>
      <div className="favorites-list">
        {favorites.map((place) => (
          <PlaceItem key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
