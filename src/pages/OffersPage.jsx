import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import { getMarkets, getOffers } from '../api/offers.js';
import FilterBar from '../components/FilterBar.jsx';
import OfferCard from '../components/OfferCard.jsx';
import CategoryIcon from '../components/CategoryIcon.jsx';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function sortOffers(offers, sortBy) {
  const list = [...offers];
  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    case 'price-desc':
      return list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    case 'title-asc':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case 'valid-to':
      return list.sort((a, b) => new Date(a.validTo || 0) - new Date(b.validTo || 0));
    default:
      return list;
  }
}

function groupByCategory(offers) {
  const groups = new Map();
  for (const offer of offers) {
    const key = offer.category || 'Sonstiges';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(offer);
  }
  return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
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
  const [groupBy, setGroupBy] = useState(searchParams.get('group') !== 'false');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (selectedMarkets.length) params.market = selectedMarkets.join(',');
    if (!currentOnly) params.current = 'false';
    if (!groupBy) params.group = 'false';
    if (sortBy !== 'relevance') params.sort = sortBy;
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, selectedMarkets, currentOnly, groupBy, sortBy, setSearchParams]);

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

  const sortedOffers = useMemo(() => sortOffers(offers, sortBy), [offers, sortBy]);
  const categoryGroups = useMemo(() => groupByCategory(sortedOffers), [sortedOffers]);

  const renderGrid = (items) => (
    <div
      className="fade-in"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: '1.25rem'
      }}
    >
      {items.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          isFavorite={isFavorite(offer.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '1.75rem', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem' }}>Aktuelle Angebote</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Finde die besten Angebote aus deiner Region.
        </p>
      </div>

      {!user && (
        <div
          className="card"
          style={{
            padding: '0.85rem 1.1rem',
            marginBottom: '1.25rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0, color: 'var(--warning)' }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          Melde dich an, um Angebote als Favoriten zu speichern.
        </div>
      )}

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        selectedMarkets={selectedMarkets}
        onMarketsChange={setSelectedMarkets}
        markets={markets}
        groupByCategory={groupBy}
        onGroupByCategoryChange={setGroupBy}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        currentOnly={currentOnly}
        onCurrentOnlyChange={setCurrentOnly}
        resultCount={sortedOffers.length}
        loading={loading}
      />

      {error && (
        <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', color: 'var(--danger)', background: 'var(--danger-dim)', border: '1px solid var(--danger-dim)' }}>
          {error}
        </div>
      )}

      {loading && sortedOffers.length === 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.25rem' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '340px', borderRadius: 'var(--radius-lg)' }} />
          ))}
        </div>
      ) : sortedOffers.length === 0 ? (
        <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '3rem', height: '3rem', color: 'var(--text-muted)' }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <strong style={{ color: 'var(--text)', fontSize: '1.1rem' }}>Keine Angebote gefunden</strong>
          <p style={{ margin: '0.25rem 0 0' }}>Passe die Filter an oder suche nach einem anderen Begriff.</p>
        </div>
      ) : groupBy ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {categoryGroups.map(([category, items]) => (
            <section key={category} className="fade-in">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '1rem',
                  paddingBottom: '0.6rem',
                  borderBottom: '1px solid var(--border)'
                }}
              >
                <CategoryIcon category={category} />
                <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>{category}</h2>
                <span className="badge badge-primary">{items.length}</span>
              </div>
              {renderGrid(items)}
            </section>
          ))}
        </div>
      ) : (
        renderGrid(sortedOffers)
      )}
    </div>
  );
}

export default OffersPage;
