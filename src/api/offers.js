import api from './client.js';

export const getMarkets = () => api.get('/markets');

export const getOffers = (params = {}) =>
  api.get('/offers', { params });
