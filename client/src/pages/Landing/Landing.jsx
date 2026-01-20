// src/pages/Landing/Landing.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/Input/Input';
import './Landing.css';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '', loading: false, emailExists: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (status.message || status.emailExists) {
      setStatus({ type: '', message: '', loading: false, emailExists: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus({ type: '', message: '', loading: true, emailExists: false });

    if (formData.password.length < 8) {
      setErrors({ password: 'Password must be at least 8 characters' });
      setStatus({ type: '', message: '', loading: false, emailExists: false });
      return;
    }

    const workspaceName = formData.name.trim() || formData.email.split('@')[0];
    const registrationData = { ...formData, workspace: workspaceName };

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.error?.includes('already') || data?.error?.includes('exists')) {
          setStatus({ 
            type: 'error', 
            message: '', 
            loading: false,
            emailExists: true
          });
          setErrors({ 
            email: 'This email is already registered.' 
          });
        } else {
          throw new Error(data?.error || 'Registration failed. Please try again.');
        }
        return;
      }

      setStatus({ 
        type: 'success', 
        message: 'Account created! Redirecting to login...', 
        loading: false,
        emailExists: false
      });

      setTimeout(() => {
        navigate('/login', { 
          state: { 
            email: formData.email,
            fromRegister: true 
          } 
        });
      }, 1500);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Something went wrong. Please try again.', 
        loading: false,
        emailExists: false
      });
    }
  };

  if (isAuthenticated) {
    navigate('/home');
    return null;
  }

  return (
    <main className="landing">
      <div className="landing-container">
        {/* Hero Section */}
        <section className="landing-hero">
          <div className="hero-content">
            <h1>
              Connect securely with <span className="highlight">PingMe</span>
            </h1>
            <p className="hero-subtitle">
              Privacy-first contact sharing for modern professionals. No phone numbers exposed, just secure connections.
            </p>
          </div>

          {/* Core Benefits */}
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>Masked numbers keep your contacts private</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <h3>Instant Alerts</h3>
              <p>Real-time notifications for every scan</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📁</div>
              <h3>Secure Docs</h3>
              <p>Encrypted document sharing</p>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="landing-registration">
          <div className="registration-card">
            <h2>Get Started</h2>
            <p className="registration-subtitle">Create your PingMe account in seconds</p>

            <form className="registration-form" onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                error={errors.name}
                required
              />
              
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

              {status.emailExists && errors.email && (
                <div className="email-exists-notice">
                  <p>This email is already registered. Please login.</p>
                  <Link to="/login" className="btn btn-secondary btn-sm">
                    Login
                  </Link>
                </div>
              )}
              
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                error={errors.password}
                required
                minLength="8"
              />

              {status.message && !status.emailExists && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-cta btn-block btn-lg"
                disabled={status.loading}
              >
                {status.loading ? 'Creating account...' : 'Register'}
              </button>

              <p className="form-footer">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};
