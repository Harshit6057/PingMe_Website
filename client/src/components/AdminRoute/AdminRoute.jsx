// src/components/AdminRoute/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export const AdminRoute = ({ children }) => {
  const { isAdminAuthenticated, loading } = useAdmin();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    // Redirect to dashboard login (we'll handle login UI in dashboard page itself)
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
