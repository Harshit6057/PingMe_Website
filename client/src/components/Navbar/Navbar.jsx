// src/components/Navbar/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import logo from '../../assets/pingme-logo.png';
import './Navbar.css';
import '../../assets/styles/pingme-logo.css';

const navLinks = [
  { label: 'Home', to: '/home' },
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' }
];

export const Navbar = ({ showLogout = false }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (link) => {
    if (link.label === 'Home') {
      return location.pathname === '/home' || location.pathname === '/';
    }
    return location.pathname.startsWith(link.to);
  };

  return (
    <header className="navbar-shell">
      <div className="navbar-shell__inner">
        <Link to="/" className="navbar-shell__logo">
          <img src={logo} alt="PingMe" className="pingme-logo" />
        </Link>

        <nav className="navbar-shell__links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`nav-link ${isActive(link) ? 'nav-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-shell__actions">
          <Link to="/dashboard" className="navbar-shell__cta">
            Dashboard
          </Link>
          {showLogout && (
            <button type="button" className="navbar-shell__logout" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};