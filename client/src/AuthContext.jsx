import React, { createContext, useState, useEffect } from "react";
import FavoritesPage from "./FavoritesPage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedName = localStorage.getItem("userName");
    if (savedToken) {
      setToken(savedToken);
      setUserName(savedName);
    }
  }, []);

  const login = (newToken, name) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", name || "User");
    localStorage.setItem("name",name);
    setToken(newToken);
    setUserName(name || "User");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName(null);
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, userName, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}