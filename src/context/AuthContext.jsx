import { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await authApi.getMe();
      setUser(data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    const handleChange = () => loadUser();
    window.addEventListener('auth-change', handleChange);
    return () => window.removeEventListener('auth-change', handleChange);
  }, []);

  const login = async (username, password) => {
    const { data } = await authApi.login(username, password);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    window.dispatchEvent(new Event('auth-change'));
    return data.user;
  };

  const register = async (username, password) => {
    const { data } = await authApi.register(username, password);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    window.dispatchEvent(new Event('auth-change'));
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
