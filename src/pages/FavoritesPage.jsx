import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import { getOffers } from '../api/offers.js';
import OfferCard from '../components/OfferCard.jsx';
import CategoryIcon from '../components/CategoryIcon.jsx';

function groupByCategory(offers) {
  const groups = new Map();
  for (const offer of offers) {
    const key = offer.category || 'Sonstiges';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(offer);
  }
  return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

function FavoritesPage() {
  const { user } = useAuth();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await getOffers({ limit: 5000 });
        const allOffers = data.offers || [];
        const favoriteOffers = allOffers.filter((o) => favorites.has(String(o.id)));
        setOffers(favoriteOffers);
      } catch {
        setError('Favoriten konnten nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [favorites]);

  const categoryGroups = useMemo(() => groupByCategory(offers), [offers]);

  return (
    <div className="container" style={{ paddingTop: '1.75rem', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem' }}>Meine Favoriten</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Deine gespeicherten Angebote übersichtlich nach Kategorie sortiert.
        </p>
      </div>

      {error && <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.25rem' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '340px', borderRadius: 'var(--radius-lg)' }} />
          ))}
        </div>
      ) : offers.length === 0 ? (
        <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '3rem', height: '3rem', color: 'var(--danger)' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <strong style={{ color: 'var(--text)', fontSize: '1.1rem' }}>Noch keine Favoriten</strong>
          <p style={{ margin: '0.25rem 0 0' }}>Auf der Startseite kannst du Angebote markieren.</p>
        </div>
      ) : (
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
              <div
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
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
