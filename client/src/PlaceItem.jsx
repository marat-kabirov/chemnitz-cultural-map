import React, { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext";

import "./PlaceItem.css";

export default function PlaceItem({ place, minimal }) {
  const { favoritePlaceIds, toggleFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const isFavorite = favoritePlaceIds.includes(place.id);

  const handleClick = useCallback(() => {
    toggleFavorite(place.id);
  }, [toggleFavorite, place.id]);

  const goToDetails = () => {
    navigate(`/places/${place.id}`);
  };

  if (minimal) {
    return (
      <div className="place-item-minimal">
        <h4 className="place-name clickable" onClick={goToDetails}>
          {place.name || "No name"}
        </h4>
        <p className="place-category">{place.category || "No category"}</p>
        <button className="fav-button" onClick={handleClick}>
          {isFavorite ? "★ Remove from favorites" : "☆ Add to favorites"}
        </button>
      </div>
    );
  }

  return (
    <div className="place-item">
      <h3 className="place-name clickable" onClick={goToDetails}>
        {place.name || "No name"}
      </h3>
      {place.image_url && (
        <img
          src={place.image_url}
          alt={place.name}
          className="place-image"
        />
      )}
      <p><strong>Category:</strong> {place.category || "No category"}</p>
      <p><strong>Address:</strong> {place.address || "No address provided"}</p>
      <p><strong>Description:</strong> {place.description || "No description available"}</p>
      <button className="fav-button" onClick={handleClick}>
        {isFavorite ? "★ " : "☆"}
      </button>
    </div>
  );
}
