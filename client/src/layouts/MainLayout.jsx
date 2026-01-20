// src/layouts/MainLayout.jsx
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import './MainLayout.css';

export const MainLayout = ({ children, showLogout = false }) => {
  return (
    <div className="main-layout">
      <Navbar showLogout={showLogout} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};