import { useEffect, useState } from 'react';

const STORAGE_KEY = 'favoriteOffers';

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function writeFavorites(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    setFavorites(readFavorites());

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setFavorites(readFavorites());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addFavorite = (offerId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.add(String(offerId));
      writeFavorites(next);
      return next;
    });
  };

  const removeFavorite = (offerId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(String(offerId));
      writeFavorites(next);
      return next;
    });
  };

  const toggleFavorite = (offerId) => {
    const id = String(offerId);
    if (favorites.has(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const isFavorite = (offerId) => favorites.has(String(offerId));

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite };
}
