const categoryMap = {
  'fleisch': 'meat',
  'wurst': 'meat',
  'geflügel': 'meat',
  'fisch': 'fish',
  'meeresfrüchte': 'fish',
  'obst': 'fruit',
  'gemüse': 'vegetable',
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
  'fertiggerichte': 'frozen',
  'nudeln': 'pasta',
  'reis': 'pasta',
  'gewürze': 'pasta',
  'saucen': 'pasta',
  'öl': 'pasta',
  'snacks': 'snack',
  'chips': 'snack',
  'nüsse': 'snack',
  'obstkorb': 'fruit',
  'salat': 'vegetable',
  'nudelsalat': 'vegetable',
  'kartoffelsalat': 'vegetable',
  'betten': 'home',
  'möbel': 'home',
  'elektronik': 'tech',
  'computer': 'tech',
  'spielzeug': 'toy',
  'baby': 'baby',
  'windeln': 'baby',
  'tiernahrung': 'pet'
};

const iconStyles = {
  meat: { color: '#f87171', bg: 'rgba(248, 113, 113, 0.12)' },
  fish: { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)' },
  fruit: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)' },
  vegetable: { color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)' },
  drink: { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
  dairy: { color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)' },
  bakery: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  sweet: { color: '#f472b6', bg: 'rgba(244, 114, 182, 0.12)' },
  coffee: { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.12)' },
  care: { color: '#c084fc', bg: 'rgba(192, 132, 252, 0.12)' },
  home: { color: '#fb923c', bg: 'rgba(251, 146, 60, 0.12)' },
  frozen: { color: '#22d3ee', bg: 'rgba(34, 211, 238, 0.12)' },
  pasta: { color: '#e879f9', bg: 'rgba(232, 121, 249, 0.12)' },
  snack: { color: '#a3e635', bg: 'rgba(163, 230, 53, 0.12)' },
  tech: { color: '#818cf8', bg: 'rgba(129, 140, 248, 0.12)' },
  toy: { color: '#fb7185', bg: 'rgba(251, 113, 133, 0.12)' },
  baby: { color: '#fdba74', bg: 'rgba(253, 186, 116, 0.12)' },
  pet: { color: '#2dd4bf', bg: 'rgba(45, 212, 191, 0.12)' },
  default: { color: 'var(--primary)', bg: 'var(--primary-dim)' }
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
          <circle cx="12" cy="14" r="7" />
          <path d="M12 7V4" />
          <path d="M15 4c-1-1-3-1-4 0" />
        </svg>
      );
    case 'vegetable':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M12 21a8 8 0 0 0 8-8c0-4-3-7-8-7S4 9 4 13a8 8 0 0 0 8 8z" />
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
    case 'pasta':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M5 17h14" />
        </svg>
      );
    case 'snack':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M2 12h20" />
          <path d="M6 8l12 8" />
          <path d="M6 16l12-8" />
        </svg>
      );
    case 'tech':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <rect x="4" y="4" width="16" height="10" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      );
    case 'toy':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="10" r="1.5" fill="currentColor" />
          <circle cx="15" cy="10" r="1.5" fill="currentColor" />
          <path d="M9 15c1.5 1.5 4.5 1.5 6 0" />
        </svg>
      );
    case 'baby':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>
      );
    case 'pet':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M10 8.5c-2 0-3.5 2-3.5 4.5 0 2.5 2 4.5 4.5 4.5h2c2.5 0 4.5-2 4.5-4.5 0-2.5-1.5-4.5-3.5-4.5" />
          <circle cx="7" cy="10" r="1.5" fill="currentColor" />
          <circle cx="17" cy="10" r="1.5" fill="currentColor" />
          <circle cx="9" cy="7" r="1.5" fill="currentColor" />
          <circle cx="15" cy="7" r="1.5" fill="currentColor" />
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
  const style = iconStyles[key] || iconStyles.default;
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
        background: style.bg,
        color: style.color
      }}
    >
      <Icon name={key} />
    </span>
  );
}

export default CategoryIcon;
