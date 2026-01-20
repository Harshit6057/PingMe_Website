// src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Input } from '../../components/Input/Input';
import './Dashboard.css';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// Admin Login Component
const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Hardcoded admin credentials (in production, verify against backend)
    const ADMIN_EMAIL = 'admin@pingme.com';
    const ADMIN_PASSWORD = 'admin123';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
        onLogin({ email: credentials.email, role: 'admin' });
      } else {
        setError('Invalid admin credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>🔐 Admin Dashboard</h1>
          <p>Enter admin credentials to continue</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <Input
            label="Admin Email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="admin@pingme.com"
            required
          />
          
          <Input
            label="Admin Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter admin password"
            required
          />

          {error && (
            <div className="form-status error">{error}</div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="admin-hint">
          <p>💡 Demo credentials:</p>
          <p>Email: <strong>admin@pingme.com</strong></p>
          <p>Password: <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  );
};

// Dashboard Analytics Component
const DashboardAnalytics = ({ admin, onLogout }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    qrScans: 0,
    avgResponseTime: '0s'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data (mock for now, replace with real API)
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data (replace with actual API call)
        setStats({
          totalUsers: 1247,
          activeUsers: 856,
          qrScans: 34829,
          avgResponseTime: '1.2s'
        });
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: '👥',
      color: '#3B82F6',
      trend: '+12.5%'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: '✅',
      color: '#10B981',
      trend: '+8.2%'
    },
    {
      title: 'QR Scans',
      value: stats.qrScans.toLocaleString(),
      icon: '📊',
      color: '#F59E0B',
      trend: '+23.1%'
    },
    {
      title: 'Avg Response Time',
      value: stats.avgResponseTime,
      icon: '⚡',
      color: '#8B5CF6',
      trend: '-5.3%'
    }
  ];

  const recentActivity = [
    { id: 1, user: 'harsh@example.com', action: 'Registered', time: '2 minutes ago' },
    { id: 2, user: 'john@example.com', action: 'QR Scan', time: '5 minutes ago' },
    { id: 3, user: 'sarah@example.com', action: 'Login', time: '12 minutes ago' },
    { id: 4, user: 'mike@example.com', action: 'Document Upload', time: '18 minutes ago' },
    { id: 5, user: 'emma@example.com', action: 'Registered', time: '25 minutes ago' }
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <div>
              <h1>📊 Admin Dashboard</h1>
              <p>Welcome, {admin.email}</p>
            </div>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="dashboard-stats">
        <div className="container">
          <div className="stats-grid-dashboard">
            {statCards.map((stat) => (
              <div key={stat.title} className="stat-card-dashboard">
                <div className="stat-header">
                  <span className="stat-icon" style={{ color: stat.color }}>
                    {stat.icon}
                  </span>
                  <span className={`stat-trend ${stat.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                    {stat.trend}
                  </span>
                </div>
                <div className="stat-value-dashboard">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="dashboard-charts">
        <div className="container">
          <div className="charts-grid">
            {/* User Growth Chart */}
            <div className="chart-card">
              <h3>User Growth</h3>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  <div className="bar" style={{ height: '60%' }}></div>
                  <div className="bar" style={{ height: '75%' }}></div>
                  <div className="bar" style={{ height: '85%' }}></div>
                  <div className="bar" style={{ height: '70%' }}></div>
                  <div className="bar" style={{ height: '90%' }}></div>
                  <div className="bar" style={{ height: '95%' }}></div>
                </div>
                <p className="chart-label">Last 6 months</p>
              </div>
            </div>

            {/* QR Scans Chart */}
            <div className="chart-card">
              <h3>QR Scans Activity</h3>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  <div className="bar secondary" style={{ height: '80%' }}></div>
                  <div className="bar secondary" style={{ height: '65%' }}></div>
                  <div className="bar secondary" style={{ height: '90%' }}></div>
                  <div className="bar secondary" style={{ height: '75%' }}></div>
                  <div className="bar secondary" style={{ height: '85%' }}></div>
                  <div className="bar secondary" style={{ height: '95%' }}></div>
                </div>
                <p className="chart-label">Last 6 months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="dashboard-activity">
        <div className="container">
          <h2>Recent Activity</h2>
          <div className="activity-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.user}</td>
                    <td>
                      <span className="activity-badge">{activity.action}</span>
                    </td>
                    <td className="activity-time">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main Dashboard Component
export const Dashboard = () => {
  const { admin, isAdminAuthenticated, loginAdmin, logoutAdmin } = useAdmin();

  if (!isAdminAuthenticated) {
    return <AdminLogin onLogin={loginAdmin} />;
  }

  return <DashboardAnalytics admin={admin} onLogout={logoutAdmin} />;
};
