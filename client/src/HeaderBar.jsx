import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { FavoritesContext } from "./FavoritesContext";
import "./HeaderBar.css";

function HeaderBar() {
  const { isLoggedIn, userName, logout } = useContext(AuthContext);
  const { favoritePlaceIds } = useContext(FavoritesContext);
  const navigate = useNavigate();

  return (
    <header className="header-bar">
      <h1 className="header-title" onClick={() => navigate("/")}>
        Cultural Places in Chemnitz
      </h1>

      <nav className="header-actions">
        {isLoggedIn && (
          <button
            className="favorites-button"
            onClick={() => navigate("/favorites")}
            title="Go to favorites"
          >
            ★ Favorites ({favoritePlaceIds?.length ?? 0})
          </button>
        )}

        {isLoggedIn ? (
          <div className="user-section">
            <span className="welcome-text">
              Welcome, <strong>{userName}</strong>
            </span>
            <button className="logout-button" onClick={logout}>
              Exit
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate("/auth")}>
            Login
          </button>
        )}
      </nav>
    </header>
  );
}

export default HeaderBar;
