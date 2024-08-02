import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage on mount:', token);

        if (!token) {
          setUser(null);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/check', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Check Auth Response:', response.data);
        setUser(response.data.user);
      } catch (err) {
        console.error('Authentication check failed:', err.response?.data || err.message);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      console.log('Login Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token saved to localStorage:', localStorage.getItem('token'));
        setUser(response.data.user);
      } else {
        console.error('No token returned from server');
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      localStorage.removeItem('token');
      console.log('Token removed from localStorage:', localStorage.getItem('token'));
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
