"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // GET favorites
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch("/api/favorites");

        if (!response.ok) {
          throw new Error("Gagal mengambil data favorites");
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFavorites();
  }, []);

  // POST favorite
  async function addFavorite(user) {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menambahkan favorite");
      }

      setFavorites((prev) => [...prev, data]);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // PATCH favorite
  async function updateFavorite(id, data) {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const updatedFavorite = await response.json();

      if (!response.ok) {
        throw new Error(
          updatedFavorite.error || "Gagal mengubah favorite"
        );
      }

      setFavorites((prev) =>
        prev.map((favorite) =>
          Number(favorite.id) === Number(id)
            ? updatedFavorite
            : favorite
        )
      );

      return updatedFavorite;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // DELETE favorite
  async function removeFavorite(id) {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
      });

      const deletedFavorite = await response.json();

      if (!response.ok) {
        throw new Error(
          deletedFavorite.error || "Gagal menghapus favorite"
        );
      }

      setFavorites((prev) =>
        prev.filter(
          (favorite) => Number(favorite.id) !== Number(id)
        )
      );

      return deletedFavorite;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        updateFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  return useContext(FavoriteContext);
} 