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
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '420px' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.5rem' }}>
          {isRegister ? 'Konto erstellen' : 'Anmelden'}
        </h1>

        {error && <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>}

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
            />
          </div>

          <button type="submit" className="btn" style={{ width: '100%' }}>
            {isRegister ? 'Registrieren' : 'Anmelden'}
          </button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {isRegister ? 'Bereits ein Konto?' : 'Noch kein Konto?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--primary)',
              fontWeight: 500,
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
