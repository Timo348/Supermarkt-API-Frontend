import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getMarkets, getOffers } from '../api/offers.js';
import * as favoritesApi from '../api/favorites.js';
import FilterBar from '../components/FilterBar.jsx';
import OfferCard from '../components/OfferCard.jsx';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function OffersPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [markets, setMarkets] = useState([]);
  const [offers, setOffers] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedMarkets, setSelectedMarkets] = useState(
    searchParams.get('market')?.split(',').filter(Boolean) || []
  );
  const [currentOnly, setCurrentOnly] = useState(searchParams.get('current') !== 'false');

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (selectedMarkets.length) params.market = selectedMarkets.join(',');
    if (!currentOnly) params.current = 'false';
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, selectedMarkets, currentOnly, setSearchParams]);

  useEffect(() => {
    getMarkets()
      .then(({ data }) => setMarkets(data.markets || []))
      .catch(() => setError('Märkte konnten nicht geladen werden.'));
  }, []);

  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await getOffers({
          search: debouncedSearch || undefined,
          market: selectedMarkets.join(',') || undefined,
          current: currentOnly ? 'true' : undefined,
          limit: 200
        });
        setOffers(data.offers || []);
      } catch {
        setError('Angebote konnten nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, [debouncedSearch, selectedMarkets, currentOnly]);

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites(new Set());
      return;
    }
    try {
      const { data } = await favoritesApi.getFavorites();
      setFavorites(new Set((data.offers || []).map((o) => String(o.id))));
    } catch {
      setFavorites(new Set());
    }
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const toggleFavorite = async (offerId) => {
    if (!user) return;
    const id = String(offerId);
    try {
      if (favorites.has(id)) {
        await favoritesApi.removeFavorite(id);
        setFavorites((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      } else {
        await favoritesApi.addFavorite(id);
        setFavorites((prev) => new Set(prev).add(id));
      }
    } catch {
      setError('Favorit konnte nicht aktualisiert werden.');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Aktuelle Angebote</h1>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        selectedMarkets={selectedMarkets}
        onMarketsChange={setSelectedMarkets}
        markets={markets}
        currentOnly={currentOnly}
        onCurrentOnlyChange={setCurrentOnly}
        resultCount={offers.length}
        loading={loading}
      />

      {error && <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>}

      {loading && offers.length === 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '320px' }} />
          ))}
        </div>
      ) : offers.length === 0 ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Keine Angebote gefunden.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isFavorite={favorites.has(String(offer.id))}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OffersPage;
