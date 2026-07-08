import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import { getOffers } from '../api/offers.js';
import OfferCard from '../components/OfferCard.jsx';

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

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Meine Favoriten</h1>

      {error && <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '320px' }} />
          ))}
        </div>
      ) : offers.length === 0 ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Du hast noch keine Favoriten. Auf der Startseite kannst du Angebote markieren.
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

export default FavoritesPage;
