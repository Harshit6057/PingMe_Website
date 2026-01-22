// src/layouts/AuthLayout.jsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/pingme-logo.png';
import './AuthLayout.css';
import '../assets/styles/pingme-logo.css';

export const AuthLayout = () => {
  const location = useLocation();
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' }
  ];

  return (
    <div className="auth-layout">
      <header className="auth-header">
        <div className="auth-header__inner">
          <Link to="/" className="auth-logo">
            <img src={logo} alt="PingMe" className="pingme-logo" />
          </Link>

          <nav className="auth-nav">
            {navLinks.map(({ label, to }) => {
              const isActive =
                (label === 'Home' && (location.pathname === '/' || location.pathname === '/home')) ||
                (label !== 'Home' && location.pathname.startsWith(to));
              return (
                <Link
                  key={label}
                  to={to}
                  className={`auth-nav__link ${isActive ? 'auth-nav__link--active' : ''}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <Link to="/dashboard" className="auth-nav__cta">
            Dashboard
          </Link>
        </div>
      </header>
      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
};