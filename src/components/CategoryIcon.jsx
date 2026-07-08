const categoryMap = {
  'fleisch': 'meat',
  'wurst': 'meat',
  'geflügel': 'meat',
  'fisch': 'fish',
  'meeresfrüchte': 'fish',
  'obst': 'fruit',
  'gemüse': 'fruit',
  'früchte': 'fruit',
  'getränke': 'drink',
  'alkohol': 'drink',
  'bier': 'drink',
  'wein': 'drink',
  'milch': 'dairy',
  'käse': 'dairy',
  'joghurt': 'dairy',
  'brot': 'bakery',
  'brötchen': 'bakery',
  'gebäck': 'bakery',
  'süßigkeiten': 'sweet',
  'schokolade': 'sweet',
  'eis': 'sweet',
  'kaffee': 'coffee',
  'tee': 'coffee',
  'drogerie': 'care',
  'kosmetik': 'care',
  'haushalt': 'home',
  'reinigung': 'home',
  'tiefkühl': 'frozen',
  'fertiggerichte': 'frozen'
};

function normalizeCategory(category) {
  if (!category) return '';
  return category.toLowerCase().replace(/[^a-zäöüß]/g, '');
}

function findIconKey(category) {
  const normalized = normalizeCategory(category);
  for (const [key, icon] of Object.entries(categoryMap)) {
    if (normalized.includes(key)) return icon;
  }
  return 'default';
}

function Icon({ name }) {
  const style = { width: '1.25rem', height: '1.25rem', flexShrink: 0 };
  switch (name) {
    case 'meat':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M12 5c-3 0-5.5 2-6.5 5C4 14 6 18 10 19c4 1 8-1 9-5s-1-8-5-9" />
          <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="13" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'fish':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M16 4c3 2 5 5 5 9s-3 7-7 7c-3 0-6-2-8-5L2 12l4-3c2-3 5-5 8-5z" />
          <circle cx="14" cy="10" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'fruit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M12 6c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z" />
          <path d="M12 6V3" />
          <path d="M12 3c1.5-1 3-1 4 0" />
        </svg>
      );
    case 'drink':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M7 3h10l-1 16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2L7 3z" />
          <path d="M9 3v16" />
          <path d="M15 3v16" />
        </svg>
      );
    case 'dairy':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M8 4h8l2 16H6L8 4z" />
          <path d="M10 4V2" />
          <path d="M14 4V2" />
        </svg>
      );
    case 'bakery':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M4 19h16a2 2 0 0 0 2-2c0-4-4-7-10-7S2 13 2 17a2 2 0 0 0 2 2z" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case 'sweet':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M12 2a10 10 0 0 1 10 10c0 5-4 9-10 9S2 17 2 12 7 2 12 2z" />
          <path d="M9 10h.01" />
          <path d="M15 10h.01" />
          <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
        </svg>
      );
    case 'coffee':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M18 8h2a2 2 0 0 1 0 4h-2" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <path d="M6 1v3" />
          <path d="M10 1v3" />
          <path d="M14 1v3" />
        </svg>
      );
    case 'care':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M12 21a9 9 0 0 0 9-9c0-4.5-4-7-9-7S3 7.5 3 12a9 9 0 0 0 9 9z" />
          <path d="M12 8v8" />
          <path d="M9 12h6" />
        </svg>
      );
    case 'home':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      );
    case 'frozen':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M12 2v20" />
          <path d="M5 6l14 12" />
          <path d="M19 6L5 18" />
          <path d="M2 12h20" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
          <path d="M3 9h18" />
          <path d="M3 15h18" />
        </svg>
      );
  }
}

function CategoryIcon({ category }) {
  const key = findIconKey(category);
  return (
    <span
      title={category || 'Sonstiges'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2rem',
        height: '2rem',
        borderRadius: 'var(--radius)',
        background: '#e0e7ff',
        color: 'var(--primary)'
      }}
    >
      <Icon name={key} />
    </span>
  );
}

export default CategoryIcon;
