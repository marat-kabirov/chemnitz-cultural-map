import React, { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./AuthContext";

import HeaderBar from "./HeaderBar";
import MainPage from "./MainPage";
import FavoritesPage from "./FavoritesPage";
import AuthPage from "./AuthPage";
import PlaceDetails from "./PlaceDetails";

function AppContent() {
  const [places, setPlaces] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3001/api/places")
      .then((res) => res.json())
      .then(setPlaces)
      .catch(console.error);
  }, []);

  if (places.length === 0) {
    return <div className="container">Loading places...</div>;
  }

  return (
    <>
      <HeaderBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage places={places} />} />
          <Route path="/favorites" element={<FavoritesPage places={places} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/places/:id" element={<PlaceDetails places={places} />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
