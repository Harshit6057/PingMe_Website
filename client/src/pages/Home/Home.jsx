// src/pages/Home/Home.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Home.css';

export const Home = () => {
  const { user } = useAuth();

  const stats = [
    { value: '180+', label: 'Cities actively scanning' },
    { value: '2.5M+', label: 'Masked connections routed' },
    { value: '58s', label: 'Average response time' },
    { value: '1.2K+', label: 'Communities onboarded' }
  ];

  const features = [
    {
      icon: '🔐',
      title: 'Privacy-first alerts',
      description: 'Bridge every ping through masked calls and WhatsApp relays so identities remain protected.'
    },
    {
      icon: '📊',
      title: 'Sampark HQ dashboard',
      description: 'Assign tags, monitor escalations, and automate workflows from a single live control center.'
    },
    {
      icon: '📁',
      title: 'Document locker',
      description: 'Store RC, insurance, and compliance proofs with OTP gates directly inside PingMe.'
    }
  ];

  const quickActions = [
    { title: 'Create New Tag', icon: '➕', action: '#create' },
    { title: 'View Analytics', icon: '📈', action: '#analytics' },
    { title: 'Manage Team', icon: '👥', action: '#team' },
    { title: 'Settings', icon: '⚙️', action: '#settings' }
  ];

  return (
    <main className="home-page">
      {/* Welcome Section */}
      <section className="home-welcome">
        <div className="container">
          <div className="welcome-header">
            <div>
              <h1>Welcome back{user?.workspaceSlug ? `, ${user.workspaceSlug}` : ''}!</h1>
              <p className="welcome-subtitle">Here's what's happening with your PingMe workspace</p>
            </div>
            <Link to="/dashboard" className="btn btn-primary">
              Dashboard
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="home-actions">
        <div className="container">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action) => (
              <a key={action.title} href={action.action} className="action-card">
                <div className="action-icon">{action.icon}</div>
                <div className="action-title">{action.title}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="container">
          <div className="section-header">
            <h2>PingMe Core Features</h2>
            <p>Everything you need for secure, private communication</p>
          </div>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Section */}
      <section className="home-activity">
        <div className="container">
          <h2>Recent Activity</h2>
          <div className="activity-card">
            <div className="activity-empty">
              <div className="empty-icon">📭</div>
              <h3>No recent activity</h3>
              <p>Your workspace activity will appear here once you start using PingMe</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
