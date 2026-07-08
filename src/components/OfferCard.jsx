import { useAuth } from '../context/AuthContext.jsx';
import CategoryIcon from './CategoryIcon.jsx';

function formatPrice(price) {
  if (price == null) return null;
  return `${price.toFixed(2).replace('.', ',')} €`;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function OfferCard({ offer, isFavorite, onToggleFavorite }) {
  const { user } = useAuth();

  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#f9fafb' }}>
        {offer.imageUrl ? (
          <img
            src={offer.imageUrl}
            alt={offer.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            Kein Bild
          </div>
        )}
        {user && (
          <button
            onClick={() => onToggleFavorite(offer.id)}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.95)',
              color: isFavorite ? 'var(--danger)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow)'
            }}
            title={isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
          >
            <svg viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CategoryIcon category={offer.category} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.025em' }}>
            {offer.marketName || offer.retailerName || 'Unbekannter Markt'}
          </span>
        </div>

        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}>
          {offer.title}
        </h3>
        {offer.description && (
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {offer.description}
          </p>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
            {formatPrice(offer.price)}
          </span>
          {offer.oldPrice && (
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
              {formatPrice(offer.oldPrice)}
            </span>
          )}
          {offer.referencePrice && offer.unit && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {offer.referencePrice.toFixed(2).replace('.', ',')} € / {offer.unit}
            </span>
          )}
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Gültig: {formatDate(offer.validFrom)} – {formatDate(offer.validTo)}
        </div>
      </div>
    </article>
  );
}

export default OfferCard;
