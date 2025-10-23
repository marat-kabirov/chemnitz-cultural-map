import React, { useState, useMemo, useContext } from "react";
import MapView from "./MapView";
import PlacesList from "./PlacesList";
import { FavoritesContext } from "./FavoritesContext";

import "./MainPage.css"; // импорт стилей

function MainPage({ places }) {
  const { favoritePlaceIds = [] } = useContext(FavoritesContext);
  const [filter, setFilter] = useState("all");
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const placesWithFavorites = useMemo(() => {
    return places.map((place) => ({
      ...place,
      isFavorite: favoritePlaceIds.includes(place.id),
    }));
  }, [places, favoritePlaceIds]);

  const categories = useMemo(() => {
    const cats = new Set(placesWithFavorites.map((p) => p.category || "Other"));
    return ["all", "favorites", ...cats];
  }, [placesWithFavorites]);

  const filteredPlaces = useMemo(() => {
    let result = placesWithFavorites;

    if (filter === "favorites") {
      result = result.filter((p) => p.isFavorite);
    } else if (filter !== "all") {
      result = result.filter((p) => p.category === filter);
    }

    if (searchName) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchCategory) {
      result = result.filter((p) =>
        (p.category || "").toLowerCase().includes(searchCategory.toLowerCase())
      );
    }

    return result;
  }, [placesWithFavorites, filter, searchName, searchCategory]);

  return (
    <div className="mainpage-container">
      <div className="mainpage-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-button ${filter === cat ? "active" : ""}`}
          >
            {cat === "favorites"
              ? "★ Favorites"
              : cat === "all"
              ? "All Categories"
              : cat}
          </button>
        ))}
      </div>

      <div className="mainpage-content">
        <div className="map-container">
          <MapView places={filteredPlaces} />
        </div>

        <div className="list-container">
          <PlacesList
            places={filteredPlaces}
            searchName={searchName}
            searchCategory={searchCategory}
            setSearchName={setSearchName}
            setSearchCategory={setSearchCategory}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
