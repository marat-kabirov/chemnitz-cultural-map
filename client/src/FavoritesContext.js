import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext);

  // Загрузка избранного при смене токена
  useEffect(() => {
    if (!token) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch("http://localhost:3001/api/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch favorites");
        return res.json();
      })
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  // Функция добавления или удаления из избранного
  const toggleFavorite = useCallback(
    async (placeId) => {
      if (!token) return;

      const isFav = favorites.some((place) => place.id === placeId);

      try {
        let res;

        if (isFav) {
          // Удаляем избранное
          res = await fetch(`http://localhost:3001/api/favorites/${placeId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            setFavorites((prev) => prev.filter((p) => p.id !== placeId));
          } else {
            console.error("Failed to remove favorite:", res.status);
          }
        } else {
          // Добавляем в избранное
          res = await fetch("http://localhost:3001/api/favorites", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ place_id: placeId }),
          });
          if (res.ok) {
            // Обновляем весь список, чтобы получить актуальные данные с сервера
            const res2 = await fetch("http://localhost:3001/api/favorites", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res2.ok) {
              const data = await res2.json();
              setFavorites(data);
            }
          } else {
            console.error("Failed to add favorite:", res.status);
          }
        }
      } catch (err) {
        console.error("Error toggling favorite:", err);
      }
    },
    [favorites, token]
  );

  const favoritePlaceIds = useMemo(() => favorites.map((p) => p.id), [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, favoritePlaceIds, loading, error, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
