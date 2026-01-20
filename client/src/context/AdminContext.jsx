// src/context/AdminContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('pingme_admin');
    if (savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin);
        setAdmin(parsed);
      } catch (error) {
        console.error('Failed to parse admin session:', error);
        localStorage.removeItem('pingme_admin');
      }
    }
    setLoading(false);
  }, []);

  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('pingme_admin', JSON.stringify(adminData));
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('pingme_admin');
  };

  const value = {
    admin,
    isAdminAuthenticated: !!admin,
    loading,
    loginAdmin,
    logoutAdmin
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
