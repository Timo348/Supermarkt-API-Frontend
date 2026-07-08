import { useEffect, useState, useCallback } from 'react';
import * as favoritesApi from '../api/favorites.js';
import OfferCard from '../components/OfferCard.jsx';

function FavoritesPage() {
  const [offers, setOffers] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await favoritesApi.getFavorites();
      const offersList = data.offers || [];
      setOffers(offersList);
      setFavorites(new Set(offersList.map((o) => String(o.id))));
    } catch {
      setError('Favoriten konnten nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleFavorite = async (offerId) => {
    const id = String(offerId);
    try {
      if (favorites.has(id)) {
        await favoritesApi.removeFavorite(id);
        setOffers((prev) => prev.filter((o) => String(o.id) !== id));
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
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
