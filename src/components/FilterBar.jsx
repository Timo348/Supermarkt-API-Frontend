function FilterBar({ search, onSearchChange, selectedMarkets, onMarketsChange, markets, currentOnly, onCurrentOnlyChange, resultCount, loading }) {
  const toggleMarket = (marketId) => {
    if (selectedMarkets.includes(marketId)) {
      onMarketsChange(selectedMarkets.filter((id) => id !== marketId));
    } else {
      onMarketsChange([...selectedMarkets, marketId]);
    }
  };

  return (
    <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
        <div className="form-group" style={{ flex: '1 1 240px', marginBottom: 0 }}>
          <label htmlFor="search">Suche</label>
          <input
            id="search"
            type="text"
            placeholder="Produkt, Marke oder Kategorie..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ flex: '1 1 240px', marginBottom: 0 }}>
          <label htmlFor="market">Markt</label>
          <select
            id="market"
            value={selectedMarkets.length <= 1 ? selectedMarkets[0] || '' : 'multiple'}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') onMarketsChange([]);
              else if (value === 'multiple') return;
              else onMarketsChange([value]);
            }}
          >
            <option value="">Alle Märkte</option>
            {markets.map((market) => (
              <option key={market.id} value={market.id}>
                {market.name}
              </option>
            ))}
          </select>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            paddingBottom: '0.5rem'
          }}
        >
          <input
            type="checkbox"
            checked={currentOnly}
            onChange={(e) => onCurrentOnlyChange(e.target.checked)}
          />
          Nur aktuelle Angebote
        </label>
      </div>

      {selectedMarkets.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
          {selectedMarkets.map((marketId) => {
            const market = markets.find((m) => m.id === marketId);
            return (
              <span
                key={marketId}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  background: '#e0e7ff',
                  color: 'var(--primary)',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}
              >
                {market?.name || marketId}
                <button
                  onClick={() => toggleMarket(marketId)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'inherit',
                    fontSize: '1rem',
                    lineHeight: 1,
                    cursor: 'pointer'
                  }}
                  aria-label="Entfernen"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        {loading ? 'Angebote werden geladen...' : `${resultCount} Angebot${resultCount !== 1 ? 'e' : ''} gefunden`}
      </div>
    </div>
  );
}

export default FilterBar;
