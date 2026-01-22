// src/pages/Login/Login.jsx
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import './Login.css';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ 
    email: location.state?.email || '', 
    password: '' 
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '', loading: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (status.message) {
      setStatus({ type: '', message: '', loading: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus({ type: '', message: '', loading: true });

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Invalid email or password');
      }

      onLogin({
        workspaceSlug: data.workspaceSlug,
        email: formData.email,
        lastLogin: data.lastLogin || new Date().toISOString()
      });

      setStatus({ type: 'success', message: 'Login successful!', loading: false });
      
      setTimeout(() => {
        navigate('/home', { replace: true });
      }, 500);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Login failed. Please try again.', 
        loading: false 
      });
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">

        <div className="auth-form-wrapper">
          <div className="login-header">
            <p className="login-header__eyebrow">PingMe</p>
            <h1>Welcome back</h1>
            <p className="auth-subtitle">Login to access your PingMe workspace</p>
          </div>

          {location.state?.fromRegister && (
            <div className="success-banner">
              <p>✓ Account created successfully! Please login to continue.</p>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
              required
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              required
            />

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={status.loading}
            >
              {status.loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};