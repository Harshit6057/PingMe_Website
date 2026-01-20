// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Landing } from '../pages/Landing/Landing';
import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import { Register } from '../pages/Register/Register';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';

const ProtectedRoute = ({ children, session }) => {
  const location = useLocation();
  
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const AppRoutes = ({ 
  session, 
  onLogin, 
  onLogout,
  // Other required props for pages
  ...props 
}) => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <MainLayout session={session} onLogout={onLogout}>
            <Landing session={session} />
          </MainLayout>
        } 
      />
      
      <Route element={<AuthLayout />}>
        <Route 
          path="/login" 
          element={
            <Login 
              apiStatus={props.apiStatus} 
              refreshApiStatus={props.refreshApiStatus} 
              onLogin={onLogin} 
            />
          } 
        />
        <Route 
          path="/register" 
          element={
            <Register 
              apiStatus={props.apiStatus} 
              refreshApiStatus={props.refreshApiStatus} 
            />
          } 
        />
      </Route>

      <Route
        path="/home"
        element={
          <ProtectedRoute session={session}>
            <MainLayout session={session} onLogout={onLogout}>
              <Home 
                session={session}
                // Pass all other props needed by Home
                {...props}
              />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};