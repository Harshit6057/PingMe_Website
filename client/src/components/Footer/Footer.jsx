// src/components/Footer/Footer.jsx
import { Link } from 'react-router-dom';
import logo from '../../assets/pingme-logo.png';
import './Footer.css';

export const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <img src={logo} alt="PingMe" className="footer-logo" />
        <p>© 2024 PingMe. All rights reserved.</p>
      </div>
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <div> | </div>
        <Link to="/refund-policy">Refund Policy</Link>
        <div> | </div>
        <Link to="/pricing-shipment">Pricing & Shipment</Link>
        <div> | </div>
        <Link to="/terms-conditions">Terms & Conditions</Link>
      </div>
    </div>
  </footer>
);
