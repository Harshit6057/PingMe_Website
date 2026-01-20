// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Landing } from './pages/Landing/Landing';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { PrivacyPolicy } from './pages/PrivacyPolicy/PrivacyPolicy';
import { RefundPolicy } from './pages/RefundPolicy/RefundPolicy';
import { PricingShipment } from './pages/PricingShipment/PricingShipment';
import { TermsConditions } from './pages/TermsConditions/TermsConditions';
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';

function App() {
  const { login } = useAuth();
  const [apiStatus, setApiStatus] = useState({
    healthy: false,
    loading: true,
    message: 'Checking API status...'
  });

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/health`);
      const data = await response.json();
      setApiStatus({
        healthy: response.ok,
        loading: false,
        message: data.message || 'API is healthy'
      });
    } catch (error) {
      setApiStatus({
        healthy: false,
        loading: false,
        message: 'Failed to connect to API'
      });
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  return (
    <div className="app">
      <Routes>
        {/* Landing Page - Registration embedded */}
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Landing />
            </MainLayout>
          } 
        />

        {/* Login Page - Only for non-authenticated users */}
        <Route element={<AuthLayout />}>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login 
                  apiStatus={apiStatus} 
                  refreshApiStatus={checkApiHealth} 
                  onLogin={login} 
                />
              </PublicRoute>
            } 
          />
        </Route>

        {/* Protected Home Page - Only for authenticated users */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <MainLayout showLogout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Dashboard - Admin only (handles own auth) */}
        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />

        {/* Policy Pages - Public access */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/pricing-shipment" element={<PricingShipment />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
