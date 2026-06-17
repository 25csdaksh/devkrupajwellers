import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user session on startup
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser({
            id: data._id,
            displayName: data.name,
            email: data.email,
            metadata: { creationTime: data.createdAt }
          });
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Sign Up
  const signUp = async (email, password, displayName) => {
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: displayName, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    localStorage.setItem('token', data.token);
    setUser({
      id: data.user.id,
      displayName: data.user.name,
      email: data.user.email,
      metadata: { creationTime: data.user.createdAt }
    });

    return data;
  };

  // Login
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    setUser({
      id: data.user.id,
      displayName: data.user.name,
      email: data.user.email,
      metadata: { creationTime: data.user.createdAt }
    });

    return data;
  };

  // Logout
  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Update profile display name
  const updateUserProfile = async (displayName) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const res = await fetch(`${API_URL}/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: displayName })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Profile update failed');
    }

    setUser({
      id: data.id,
      displayName: data.name,
      email: data.email,
      metadata: { creationTime: data.createdAt }
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, login, logout, updateUserProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
