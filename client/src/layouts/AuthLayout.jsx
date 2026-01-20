// src/layouts/AuthLayout.jsx
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/pingme-logo.png';
import './AuthLayout.css';
import '../assets/styles/pingme-logo.css';

export const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <img src={logo} alt="PingMe" className="pingme-logo" />
        </Link>
      </header>
      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
};