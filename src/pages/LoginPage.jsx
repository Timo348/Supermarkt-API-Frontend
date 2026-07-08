import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Benutzername ist erforderlich.');
      return;
    }
    if (password.length < 4) {
      setError('Passwort muss mindestens 4 Zeichen haben.');
      return;
    }

    if (isRegister) {
      register(username.trim());
    } else {
      login(username.trim());
    }
    navigate('/');
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', maxWidth: '420px' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--primary-dim)',
              color: 'var(--primary)',
              marginBottom: '1rem'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.75rem', height: '1.75rem' }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
            {isRegister ? 'Konto erstellen' : 'Anmelden'}
          </h1>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isRegister ? 'Erstelle ein lokales Konto für Favoriten.' : 'Melde dich an, um Favoriten zu verwalten.'}
          </p>
        </div>

        {error && (
          <div
            className="error"
            style={{
              marginBottom: '1rem',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius)',
              background: 'var(--danger-dim)',
              fontWeight: 500
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Benutzername</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="z. B. max.mustermann"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Passwort</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              placeholder="Mindestens 4 Zeichen"
            />
          </div>

          <button type="submit" className="btn" style={{ width: '100%', marginTop: '0.5rem' }}>
            {isRegister ? 'Registrieren' : 'Anmelden'}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {isRegister ? 'Bereits ein Konto?' : 'Noch kein Konto?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--primary)',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isRegister ? 'Anmelden' : 'Registrieren'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
