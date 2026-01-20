// src/pages/Home/Home.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import homeImage from '../../assets/home.png';
import './Home.css';

export const Home = () => {
  const { user } = useAuth();

  const stats = [
    { icon: '👥', value: '50,000+', label: 'Happy Customers' },
    { icon: '👥', value: '2', label: 'Expert Doctors' },
    { icon: '⭐', value: '4.8', label: 'Google Rating' },
    { icon: '🏢', value: '10', label: 'Clinic Branches' }
  ];

  const vehicleFeatures = [
    {
      icon: '🔒',
      title: 'Private Contact',
      description: 'Receive masked calls, SMS, and WhatsApp alerts instantly.'
    },
    {
      icon: '💬',
      title: 'WhatsApp Update',
      description: 'Receive masked calls, SMS, and WhatsApp alerts instantly.'
    },
    {
      icon: '📤',
      title: 'Upload Files',
      description: 'Add RC, insurance, and PUC documents secured with OTP.'
    },
    {
      icon: '⭐',
      title: 'Emergency Call',
      description: 'Add backup emergency contacts directly inside the tag.'
    }
  ];

  const whatWeDoFeatures = [
    {
      title: 'Car / Bike Ping Tag',
      items: [
        'Masked calls, WhatsApp & SMS relays',
        'Emergency ping + backup contacts',
        'Vehicle entry / exit logs and audit',
        'Insurance & PUC reminders on autopilot'
      ]
    },
    {
      title: 'Business Sampark Kit',
      items: [
        'White-labeled QR / NFC with your logo',
        'Staff roles, approvals, and bulk seats',
        'Analytics dashboard with service logs',
        'Dedicated success manager'
      ]
    },
    {
      title: 'Starter Pack For Shops',
      items: [
        'Customizable art + marketing standees',
        'Training and scripts for your team',
        'Counter-top boxes & POS display',
        '60 day money-back program'
      ]
    },
    {
      title: 'Starter Pack For Shops',
      items: [
        'Customizable art + marketing standees',
        'Training and scripts for your team',
        'Counter-top boxes & POS display',
        '60 day money-back program'
      ]
    }
  ];

  const faqItems = [
    'How Car PingMe Tag can reduce parking complaints in Delhi markets?',
    'How PingMe decals keep apartment driveways complaint-free?',
    'Do I need separate tags for bike + helmet combos?',
    'Can societies broadcast emergency notices with PingMe?',
    'How quickly can I update backup contacts?',
    'What makes PingMe safer than printing a phone number?'
  ];

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-tagline">SCAN - READY FUTURE - QR THAT SPARKS CONVERSATION</p>
              <h1>
                Bring Your Brand To Life With Bold, Custom{' '}
                <span className="highlight-yellow">QR Decals</span>
              </h1>
              <p className="hero-description">
                PingMe transforms windshields, shop fronts, helmets, and merch into interactive hubs that route fans to whatever matters—profiles, offers, playlists, or support.
              </p>
              <div className="hero-cta">
                <button className="btn btn-primary-dark">Shop Signature Kits</button>
                <button className="btn btn-outline">Preview A Ling Ping</button>
              </div>
              
            </div>
            
            <div className="hero-image">
              <img src={homeImage} alt="PingMe QR Decal" className="home-sticker" />
            </div>
          </div>
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Tag Section */}
      <section className="home-vehicle-tag">
        <div className="container">
          <div className="vehicle-tag-content">
            <div className="vehicle-tag-image">
              <img src={homeImage} alt="PingME Vehicle Contact Tag" className="vehicle-sticker" />
              <p className="vehicle-phone">or call 7347340000</p>
            </div>
            <div className="vehicle-features">
              <h2>Privacy And Security at its best, PingME Vehicle Contact Tag</h2>
              <div className="features-list">
                {vehicleFeatures.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <div>
                      <h3>{index + 1}. {feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="home-what-we-do">
        <div className="container">
          <p className="section-eyebrow">What We Do</p>
          <h2 className="section-title">
            Allow people to contact you in case of any issue with your parked vehicle.
          </h2>
          <div className="what-we-do-grid">
            {whatWeDoFeatures.map((feature, index) => (
              <div key={index} className="what-we-do-card">
                <h3>{feature.title}</h3>
                <ul>
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reach Us Out Section */}
      <section className="home-contact">
        <div className="container">
          <h2 className="contact-title">REACH US OUT</h2>
          <div className="contact-info">
            <p>Address: WBI, 1st Floor, Shakarpur, New Delhi 110092</p>
            <p>Call Us: +91 987654320</p>
          </div>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="First Name" className="form-input" />
              <input type="text" placeholder="Last Name" className="form-input" />
            </div>
            <textarea placeholder="Enter Your Message" className="form-textarea" rows="4"></textarea>
            <button type="submit" className="btn btn-submit">Submit Enquiry</button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="home-faq">
        <div className="container">
          <div className="faq-header">
            <span className="faq-icon">❓</span>
            <h2>FREQUENTLY ASKED QUESTIONS</h2>
          </div>
          <p className="faq-subtitle">Answers to common questions about homeopathy and our practice.</p>
          <div className="faq-list">
            {faqItems.map((question, index) => (
              <div key={index} className="faq-item">
                <p>{question}</p>
                <span className="faq-toggle">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
