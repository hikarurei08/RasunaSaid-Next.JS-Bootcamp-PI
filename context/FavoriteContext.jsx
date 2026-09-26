"use client";

import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(user) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === user.id
      );

      if (alreadyFavorite) {
        return currentFavorites;
      }

      return [...currentFavorites, user];
    });
  }

  function removeFavorite(userId) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.id !== userId)
    );
  }

  function toggleFavorite(user) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === user.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (favorite) => favorite.id !== user.id
        );
      }

      return [...currentFavorites, user];
    });
  }

  function isFavorite(userId) {
    return favorites.some((favorite) => favorite.id === userId);
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);

  if (context === undefined) {
    throw new Error(
      "useFavorite harus dipakai di dalam <FavoriteProvider>"
    );
  }

  return context;
} 