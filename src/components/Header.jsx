import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? 'var(--primary)' : 'var(--text)',
    fontWeight: 500,
    padding: '0.5rem 0'
  });

  return (
    <header
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text)', fontWeight: 700, fontSize: '1.125rem' }}>
          Supermarkt-Angebote
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={navLinkStyle('/')}>Angebote</Link>
          {user ? (
            <>
              <Link to="/favorites" style={navLinkStyle('/favorites')}>Favoriten</Link>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {user.username}
              </span>
              <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}>
                Abmelden
              </button>
            </>
          ) : (
            <Link to="/login" className="btn" style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}>
              Anmelden
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
