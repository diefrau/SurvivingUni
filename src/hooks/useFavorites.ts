import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Favorite, Spot } from '../types/domain';

const FAVORITES_KEY = 'campus-survival-map:favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const persist = async (next: Favorite[]) => {
    setFavorites(next);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  };

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((value) => setFavorites(value ? JSON.parse(value) as Favorite[] : []))
      .finally(() => setIsLoading(false));
  }, []);

  const isFavorite = (spotId: Spot['id']) => favorites.some((favorite) => favorite.spotId === spotId);
  const addFavorite = async (spotId: Spot['id']) => {
    if (isFavorite(spotId)) return;
    await persist([...favorites, { id: `favorite-${spotId}`, spotId, createdAt: new Date().toISOString() }]);
  };
  const removeFavorite = async (spotId: Spot['id']) => persist(favorites.filter((favorite) => favorite.spotId !== spotId));
  const toggleFavorite = async (spotId: Spot['id']) => isFavorite(spotId) ? removeFavorite(spotId) : addFavorite(spotId);

  return { favorites, favoriteSpotIds: favorites.map((favorite) => favorite.spotId), isLoading, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
