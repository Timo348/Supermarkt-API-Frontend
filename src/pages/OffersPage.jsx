import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import { getMarkets, getOffers } from '../api/offers.js';
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
  const { toggleFavorite, isFavorite } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  const [markets, setMarkets] = useState([]);
  const [offers, setOffers] = useState([]);
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

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Aktuelle Angebote</h1>

      {!user && (
        <div className="card" style={{ padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Melde dich an, um Angebote als Favoriten zu speichern.
        </div>
      )}

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
              isFavorite={isFavorite(offer.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OffersPage;
