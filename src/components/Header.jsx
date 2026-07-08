import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

function Header() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Angebote' },
    ...(user ? [{ path: '/favorites', label: 'Favoriten' }] : [])
  ];

  return (
    <header
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(24, 27, 36, 0.85)'
      }}
      data-theme={isDark ? 'dark' : 'light'}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            color: 'var(--text)',
            fontWeight: 700,
            fontSize: '1.15rem'
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: 'var(--radius)',
              background: 'var(--primary-dim)',
              color: 'var(--primary)'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: '1.2rem', height: '1.2rem' }}>
              <path d="M3 3h18v18H3z" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
              <path d="M15 15h3" />
              <path d="M15 18h3" />
            </svg>
          </span>
          <span style={{ display: 'none' }} className="show-sm">Supermarkt-Angebote</span>
          <span className="hide-sm">Supermarkt-Angebote</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: active ? 'var(--text)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius)',
                  background: active ? 'var(--surface-active)' : 'transparent',
                  transition: 'color 0.15s ease, background 0.15s ease'
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <div
            style={{
              width: '1px',
              height: '1.25rem',
              background: 'var(--border-strong)',
              margin: '0 0.5rem'
            }}
          />

          <button
            onClick={toggleTheme}
            className="btn-ghost"
            style={{ padding: '0.45rem', borderRadius: 'var(--radius)' }}
            title={isDark ? 'Helles Design' : 'Dunkles Design'}
            aria-label={isDark ? 'Helles Design' : 'Dunkles Design'}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.15rem', height: '1.15rem' }}>
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.15rem', height: '1.15rem' }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
                {user.username}
              </span>
              <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.875rem' }}>
                Abmelden
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn" style={{ padding: '0.4rem 0.85rem', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
              Anmelden
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
