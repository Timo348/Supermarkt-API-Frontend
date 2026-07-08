import { useAuth } from '../context/AuthContext.jsx';
import CategoryIcon from './CategoryIcon.jsx';

function formatPrice(price) {
  if (price == null) return null;
  return `${price.toFixed(2).replace('.', ',')} €`;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function daysLeft(validTo) {
  if (!validTo) return null;
  const diff = new Date(validTo) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return 'Abgelaufen';
  if (days === 0) return 'Noch heute';
  if (days === 1) return 'Noch 1 Tag';
  return `Noch ${days} Tage`;
}

function OfferCard({ offer, isFavorite, onToggleFavorite }) {
  const { user } = useAuth();
  const marketName = offer.marketName || offer.retailerName || 'Unbekannter Markt';
  const remaining = daysLeft(offer.validTo);

  return (
    <article className="card card-hover" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          minHeight: '180px',
          maxHeight: '220px',
          background: 'var(--bg-elevated)',
          overflow: 'hidden'
        }}
      >
        {offer.imageUrl ? (
          <img
            src={offer.imageUrl}
            alt={offer.title}
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('offer-image-error'); }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block'
            }}
          />
        ) : null}

        <div
          className="offer-image-placeholder"
          style={{
            position: 'absolute',
            inset: 0,
            display: offer.imageUrl ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '2.5rem', height: '2.5rem', opacity: 0.6 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Kein Bild</span>
        </div>

        {remaining && (
          <span
            className="badge"
            style={{
              position: 'absolute',
              top: '0.65rem',
              left: '0.65rem',
              background: remaining === 'Abgelaufen' ? 'var(--danger-dim)' : 'var(--surface)',
              color: remaining === 'Abgelaufen' ? 'var(--danger)' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
              fontWeight: 700
            }}
          >
            {remaining}
          </span>
        )}

        {user && (
          <button
            onClick={() => onToggleFavorite(offer.id)}
            style={{
              position: 'absolute',
              top: '0.65rem',
              right: '0.65rem',
              width: '2.35rem',
              height: '2.35rem',
              borderRadius: '50%',
              border: 'none',
              background: isFavorite ? 'var(--danger-dim)' : 'var(--surface)',
              color: isFavorite ? 'var(--danger)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow)',
              transition: 'all 0.15s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title={isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
          >
            <svg viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>

      <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <CategoryIcon category={offer.category} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {marketName}
          </span>
        </div>

        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, lineHeight: 1.35, color: 'var(--text)' }}>
          {offer.title}
        </h3>

        {offer.description && (
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {offer.description}
          </p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '0.6rem', display: 'flex', alignItems: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
            {formatPrice(offer.price)}
          </span>
          {offer.oldPrice && (
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'line-through', fontWeight: 500 }}>
              {formatPrice(offer.oldPrice)}
            </span>
          )}
          {offer.referencePrice && offer.unit && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginLeft: 'auto' }}>
              {offer.referencePrice.toFixed(2).replace('.', ',')} € / {offer.unit}
            </span>
          )}
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, paddingTop: '0.25rem' }}>
          Gültig: {formatDate(offer.validFrom)} – {formatDate(offer.validTo)}
        </div>
      </div>
    </article>
  );
}

export default OfferCard;
