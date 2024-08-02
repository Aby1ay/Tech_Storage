// components/AuthProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Создание контекста аутентификации
const AuthContext = createContext();

// Провайдер аутентификации
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage on mount:', token); // Проверьте токен
        if (!token) {
          setUser(null);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/check', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Check Auth Response:', response.data); // Проверьте ответ
        setUser(response.data.user);
      } catch (err) {
        console.error('Authentication check failed:', err);
        setUser(null);
      }
    };

    checkAuth();
  }, []); // Пустой массив зависимостей, чтобы запускать только при монтировании

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      console.log('Login Response:', response.data); // Проверьте ответ

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token saved to localStorage:', localStorage.getItem('token')); // Проверьте сохранение
      } else {
        console.error('No token returned from server');
      }
      
      setUser(response.data.user);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      localStorage.removeItem('token');
      console.log('Token removed from localStorage:', localStorage.getItem('token')); // Проверьте удаление
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для доступа к контексту аутентификации
export const useAuth = () => useContext(AuthContext);
