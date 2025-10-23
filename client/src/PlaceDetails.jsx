import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./PlaceDetails.css";

export default function PlaceDetails({ places }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const place = places.find((p) => p.id.toString() === id);

  if (!place) {
    return (
      <div className="place-details-notfound">
        <h2>Place not found</h2>
        <button onClick={() => navigate(-1)} className="btn-back">Go back</button>
      </div>
    );
  }

  const placeholderImage = "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="place-details-container">
      <button onClick={() => navigate(-1)} className="btn-back">Back to map</button>
      <h2 className="place-details-name">{place.name || "No name provided"}</h2>
      <img
        src={(place.image_url && place.image_url.trim() !== "") ? place.image_url : placeholderImage}
        alt={place.name || "No image available"}
        className={(place.image_url && place.image_url.trim() !== "") ? "place-image" : "place-image placeholder"}
      />
      <p><strong>Category:</strong> {place.category || "No category provided"}</p>
      <p><strong>Address:</strong> {place.address && place.address.trim() !== "" ? place.address : "No address provided"}</p>
      <p><strong>Description:</strong> {place.description && place.description.trim() !== "" ? place.description : "No description available"}</p>
      <p><strong>Rating:</strong> {place.rating !== undefined && place.rating !== null ? place.rating : "No rating yet"}</p>
      <p><strong>Coordinates:</strong> {place.latitude}, {place.longitude}</p>
    </div>
  );
}
