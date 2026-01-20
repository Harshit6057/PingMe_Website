// src/layouts/PolicyLayout.jsx
import { Link } from 'react-router-dom';
import logo from '../assets/pingme-logo.png';
import './PolicyLayout.css';

export const PolicyLayout = ({ children }) => {
  return (
    <div className="policy-layout">
      <header className="policy-header">
        <div className="policy-header-container">
          <Link to="/" className="policy-logo-link">
            <img src={logo} alt="PingMe" className="policy-logo" />
          </Link>
          <Link to="/" className="back-home-link">
            ← Back to Home
          </Link>
        </div>
      </header>
      <main className="policy-content">
        <div className="policy-container">
          {children}
        </div>
      </main>
      <footer className="policy-footer">
        <p>© 2024 PingMe. All rights reserved.</p>
      </footer>
    </div>
  );
};
