import CategoryIcon from './CategoryIcon.jsx';

function FilterBar({
  search,
  onSearchChange,
  selectedMarkets,
  onMarketsChange,
  markets,
  groupByCategory,
  onGroupByCategoryChange,
  sortBy,
  onSortByChange,
  currentOnly,
  onCurrentOnlyChange,
  resultCount,
  loading
}) {
  const toggleMarket = (marketId) => {
    if (selectedMarkets.includes(marketId)) {
      onMarketsChange(selectedMarkets.filter((id) => id !== marketId));
    } else {
      onMarketsChange([...selectedMarkets, marketId]);
    }
  };

  const clearFilters = () => {
    onSearchChange('');
    onMarketsChange([]);
    onGroupByCategoryChange(true);
    onSortByChange('relevance');
    onCurrentOnlyChange(true);
  };

  const hasActiveFilters = search || selectedMarkets.length > 0 || sortBy !== 'relevance' || !currentOnly;

  return (
    <div className="card" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
        <div className="form-group" style={{ flex: '1 1 260px', marginBottom: 0 }}>
          <label htmlFor="search">Suche</label>
          <div style={{ position: 'relative' }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                position: 'absolute',
                left: '0.8rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.1rem',
                height: '1.1rem',
                color: 'var(--text-muted)'
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="search"
              type="text"
              placeholder="Produkt, Marke oder Kategorie..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
            />
          </div>
        </div>

        <div className="form-group" style={{ flex: '0 1 200px', marginBottom: 0 }}>
          <label htmlFor="sort">Sortierung</label>
          <select id="sort" value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
            <option value="relevance">Relevanz</option>
            <option value="price-asc">Preis: aufsteigend</option>
            <option value="price-desc">Preis: absteigend</option>
            <option value="title-asc">Name: A-Z</option>
            <option value="valid-to">Gültig bis</option>
          </select>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            paddingBottom: '0.55rem',
            color: 'var(--text-secondary)'
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.15rem',
              height: '1.15rem',
              borderRadius: '4px',
              border: '1px solid var(--border-strong)',
              background: currentOnly ? 'var(--primary)' : 'var(--bg-elevated)',
              color: 'white',
              transition: 'background 0.15s ease'
            }}
          >
            {currentOnly && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '0.85rem', height: '0.85rem' }}>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </span>
          <input
            type="checkbox"
            checked={currentOnly}
            onChange={(e) => onCurrentOnlyChange(e.target.checked)}
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
          />
          Nur aktuelle Angebote
        </label>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Märkte</span>
          {selectedMarkets.length > 0 && (
            <button
              onClick={() => onMarketsChange([])}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Alle abwählen
            </button>
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {markets.map((market) => {
            const selected = selectedMarkets.includes(market.id);
            return (
              <button
                key={market.id}
                onClick={() => toggleMarket(market.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: selected ? 'var(--primary)' : 'var(--border-strong)',
                  background: selected ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                  color: selected ? 'var(--primary)' : 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title={market.category}
              >
                <span
                  style={{
                    width: '0.55rem',
                    height: '0.55rem',
                    borderRadius: '50%',
                    background: selected ? 'var(--primary)' : 'var(--border-strong)'
                  }}
                />
                {market.name}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <CategoryIcon category="Sonstiges" />
          <input
            type="checkbox"
            checked={groupByCategory}
            onChange={(e) => onGroupByCategoryChange(e.target.checked)}
            style={{ display: 'none' }}
          />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.15rem',
              height: '1.15rem',
              borderRadius: '4px',
              border: '1px solid var(--border-strong)',
              background: groupByCategory ? 'var(--primary)' : 'var(--bg-elevated)',
              color: 'white',
              transition: 'background 0.15s ease'
            }}
          >
            {groupByCategory && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '0.85rem', height: '0.85rem' }}>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </span>
          Nach Kategorie gruppieren
        </label>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--danger)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
        {loading ? 'Angebote werden geladen…' : `${resultCount.toLocaleString('de-DE')} Angebot${resultCount !== 1 ? 'e' : ''} gefunden`}
      </div>
    </div>
  );
}

export default FilterBar;
