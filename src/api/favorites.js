import api from './client.js';

export const getFavorites = () => api.get('/favorites');

export const addFavorite = (offerId) =>
  api.post('/favorites', { offerId });

export const removeFavorite = (offerId) =>
  api.delete(`/favorites/${offerId}`);
