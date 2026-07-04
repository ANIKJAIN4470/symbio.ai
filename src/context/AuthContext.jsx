import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('symbioai_token');
    if (!token) {
      return;
    }

    api
      .get('/auth/me')
      .then((response) => {
        if (response.data?.success) {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('symbioai_token');
        }
      })
      .catch(() => {
        localStorage.removeItem('symbioai_token');
        setIsAuthenticated(false);
      });
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Unable to sign in');
    }

    localStorage.setItem('symbioai_token', response.data.data.token);
    setUser(response.data.data.user);
    setIsAuthenticated(true);
    return true;
  };

  const register = async (fullName, email, password, role = 'Waste Producer') => {
    const response = await api.post('/auth/register', { full_name: fullName, email, password, role });
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Unable to create account');
    }

    localStorage.setItem('symbioai_token', response.data.data.token || '');
    setUser(response.data.data.user || null);
    setIsAuthenticated(true);
    return true;
  };

  const resetPassword = (email) => {
    setUser((prev) => (prev ? { ...prev, email } : prev));
    return true;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore logout failures and clear local state.
    }

    localStorage.removeItem('symbioai_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, login, register, resetPassword, logout }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
