// src/components/Navbar/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/pingme-logo.png';
import './Navbar.css';
import '../../assets/styles/pingme-logo.css';

export const Navbar = ({ showLogout = false }) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="PingMe Logo" className="pingme-logo" />
        </Link>

        <div className="navbar-actions">
          {/* Landing Page - Show Login button only */}
          {isLandingPage && !isAuthenticated && (
            <Link to="/login" className="btn btn-nav-cta">
              Login
            </Link>
          )}

          {/* Home Page - Show Logout button */}
          {showLogout && isAuthenticated && (
            <button className="btn btn-secondary" type="button" onClick={logout}>
              Logout
            </button>
          )}

          {/* Auth Pages (Login/Register) - No action buttons, just logo */}
        </div>
      </div>
    </nav>
  );
};