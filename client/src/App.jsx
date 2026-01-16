  import { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/pingme-logo.png'
import tagCard from './assets/tag-card.png'
import pingWebsite from './assets/ping-website.png'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const solutions = [
  {
    title: 'Car / Bike Ping Tag',
    summary: 'Your contact stays private while anyone can raise an alert via QR or NFC.',
    bullets: [
      'Masked calls, WhatsApp & SMS relays',
      'Emergency ping + backup contacts',
      'Vehicle entry / exit logs and audit',
      'Insurance & PUC reminders on autopilot'
    ]
  },
  {
    title: 'Business Sampark Kit',
    summary: 'Dealerships, societies, and fleets deploy branded PingMe tags with CRM access.',
    bullets: [
      'White-labeled QR / NFC with your logo',
      'Staff roles, approvals, and bulk seats',
      'Analytics dashboard with service logs',
      'Dedicated success manager'
    ]
  },
  {
    title: 'Starter Pack for Shops',
    summary: 'Pack of 20 tags plus counter collateral so you can resell or gift in-store.',
    bullets: [
      'Customizable art + marketing standees',
      'Training and scripts for your team',
      'Counter-top boxes & POS display',
      '60 day money-back program'
    ]
  },
  {
    title: 'Privacy-first Stack',
    summary: 'PingMe encrypts every touch point so help arrives without exposing identities.',
    bullets: [
      'Masked numbers by default',
      'OTP-secured document locker',
      'Offline-safe PDF fallback',
      'Audit-ready access logs'
    ]
  }
]

const whatsappHighlights = [
  'Masked Calls + WhatsApp.',
  'Emergency Call.',
  'One time Alert',
  'Insurance and PUC reminders'
]

const statsBand = [
  { value: '950K+', label: 'Active Ping tags across India' },
  { value: '100K+', label: 'Monthly scans & pings' },
  { value: '4x', label: 'Faster responses vs. phone notes' },
  { value: '98.7%', label: 'Customer happiness rating' }
]

const tagHighlights = [
  {
    title: 'Private Contact',
    description: 'Your contact details are not shared when someone reaches out.'
  },
  {
    title: 'WhatsApp Update',
    description: 'Receive masked calls, SMS, and WhatsApp alerts instantly.'
  },
  {
    title: 'Upload Files',
    description: 'Add RC, insurance, and PUC documents secured with OTP.'
  },
  {
    title: 'Emergency Call',
    description: 'Add backup emergency contacts directly inside the tag.'
  }
]

const defaultCollections = [
  {
    label: 'PingMe Car & Bike Sampark Tag',
    accent: 'Everyday vehicle essential',
    description: 'Allow people to contact you without exposing your phone number.',
    price: '₹999',
    perks: [
      'Masked calls + WhatsApp relay',
      'Instant PDF badge on email & SMS',
      'Lifetime hosting + analytics'
    ],
    cta: 'Buy now'
  },
  {
    label: 'Dual Bike + Helmet Pack',
    accent: 'Weekend rider favourite',
    description: 'Two synchronized tags for your ride and gear with emergency routing.',
    price: '₹1,499',
    perks: [
      '2 NFC + QR twins with UV coat',
      'Emergency contacts + doc locker',
      'Weather-resistant adhesive'
    ],
    cta: 'Pre-order'
  },
  {
    label: 'Business CRM Suite',
    accent: 'Dealership / Society kit',
    description: 'Bulk tag deployment with branded dashboard and staff access.',
    price: 'Talk to sales',
    perks: [
      'Bulk onboarding + CRM seats',
      'Vehicle log automation',
      'Dedicated success manager'
    ],
    cta: 'Book a demo'
  }
]

const navLinks = [
  { label: 'SAMPARK', href: '#solutions' },
  { label: 'About', href: '#about', caret: true },
  { label: 'Products', href: '#products', caret: true },
  { label: 'Updates', href: '#updates' },
  { label: 'More', href: '#more', caret: true },
  { label: 'Login', href: '#contact' },
  { label: 'CART', href: '#products' }
]

const heroPanelHighlights = [
  {
    title: 'Masked Calls',
    description: 'PingMe bridges every call so your number stays hidden.'
  },
  {
    title: 'Emergency Pulse',
    description: 'Notify backup contacts and security teams instantly.'
  },
  {
    title: 'Document Locker',
    description: 'Store RC, insurance, and PUC with OTP-based access.'
  }
]

const testimonials = [
  {
    quote:
      'PingMe decals make our community test-drives feel futuristic. Customers love the instant connect.',
    author: 'Rimika Desai — AutoArcade'
  },
  {
    quote:
      'We turned every coffee cup into a direct feedback portal. Yellow never looked this bold.',
    author: 'Zain Khan — BrewLab'
  }
]

function App() {
  const [highlightStats, setHighlightStats] = useState([
    { label: 'Live scans every day', value: '42K+' },
    { label: 'Average redirect speed', value: '1.2s' },
    { label: 'Design combos shipped', value: '1200+' }
  ])
  const [collections, setCollections] = useState(defaultCollections)
  const [formData, setFormData] = useState({ name: '', email: '', project: '' })
  const [formStatus, setFormStatus] = useState({ type: '', message: '', loading: false })

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API_URL}/api/highlights`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch highlights'))))
      .then((data) => {
        if (data?.stats) {
          setHighlightStats(data.stats)
        }
        if (data?.collections) {
          setCollections(
            data.collections.map((item) => ({
              ...item,
              accent: item.accent || 'Limited Drop',
              description:
                item.description ||
                'Dynamic QR decals crafted for founders, riders, and bold retail experiences.'
            }))
          )
        }
      })
      .catch(() => {
        // keep defaults silently for offline mode
      })

    return () => controller.abort()
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormStatus({ type: '', message: '', loading: true })

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error?.error || 'Ping failed. Try again.')
      }

      const payload = await response.json()
      setFormStatus({ type: 'success', message: payload.message, loading: false })
      setFormData({ name: '', email: '', project: '' })
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Try later.',
        loading: false
      })
    }
  }

  return (
    <>
      <nav className="nav">
        <div className="brand">
          <img src={logo} alt="PingMe logo" />
          <span>
            SAM<span className="brand-accent">PARK</span>
          </span>
        </div>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
              {link.caret && <span className="caret">▼</span>}
            </a>
          ))}
        </div>
        <div className="nav-icons">
          <button aria-label="Help center">i</button>
          <button aria-label="Switch region">
            <span role="img" aria-label="India flag">
              🇮🇳
            </span>
          </button>
        </div>
      </nav>

      <div className="pingme-app">
        <header className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Scan-ready future • QR that sparks conversations</p>
              <h1>
                Bring your brand to life with bold, custom{' '}
                <span className="highlight">QR decals</span>.
              </h1>
              <p className="hero-description">
                PingMe transforms windshields, shop fronts, helmets, and merch into interactive hubs
                that route fans to whatever matters—profiles, offers, playlists, or support.
              </p>
              <div className="hero-cta">
                <button className="primary">Shop Signature Kits</button>
                <button className="secondary">Preview a Live Ping</button>
              </div>
              <div className="hero-stats">
                {highlightStats.map((stat) => (
                  <div key={stat.label}>
                    <span>{stat.value}</span>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-card hero-panel">
              <div className="hero-card__badge">Privacy Stack</div>
              <div className="hero-card__content">
                <p>Everything routed, nothing exposed</p>
                <h3>Masked calls, WhatsApp routing, and document locker.</h3>
                <div className="hero-panel-grid">
                  {heroPanelHighlights.map((item) => (
                    <article key={item.title}>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
                <div className="hero-card__footer">
                  <span>Works in 120+ cities</span>
                  <button className="primary small">Explore how it works</button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="stats-band">
          {statsBand.map((stat) => (
            <div key={stat.label}>
              <span>{stat.value}</span>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <main>
          <section className="section tag-showcase">
            <div className="tag-media">
              <img src={tagCard} alt="PingMe Sampark card mockup" />
              <p className="tag-caption">
                Scan using any camera phone. Secure & smart QR with PingMe branding.
              </p>
            </div>
            <div className="tag-details">
              <p className="eyebrow">Car and Bike Parking Tag</p>
              <h2>Privacy and security at its best, PingMe vehicle contact tag.</h2>
              <div className="tag-grid">
                {tagHighlights.map((highlight) => (
                  <article key={highlight.title}>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </article>
                ))}
              </div>
              {/* <div className="tag-cta">
                <button className="amazon-badge">Buy now on Amazon</button>
                <button className="primary">Add to cart</button>
              </div> */}
            </div>
          </section>

          <section className="section whatsapp-block">
            <div className="whatsapp-media">
              <img src={pingWebsite} alt="PingMe WhatsApp control center" />
              <p className="tag-caption">
                WhatsApp, video calls, document management, offline tags, and replacements.
              </p>
            </div>
            <div className="whatsapp-details">
              <h2>Car / Bike Parking tag</h2>
              <p>
                Your contact details will not be shared, but anyone who has an issue with your parked
                vehicle can contact you. We will send you WhatsApp, SMS, and masked calls.
              </p>
              <ul>
                {whatsappHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button className="primary">More details</button>
            </div>
          </section>

          <section id="solutions" className="section solutions">
            <div className="section-header">
              <p className="eyebrow">What we do</p>
              <h2>Allow people to contact you in case of any issue with your parked vehicle.</h2>
            </div>
            <div className="solutions-grid">
              {solutions.map((solution) => (
                <article key={solution.title}>
                  <div>
                    <h3>{solution.title}</h3>
                    <p>{solution.summary}</p>
                  </div>
                  <ul>
                    {solution.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="products" className="section collections">
            <div className="section-header">
              <p className="eyebrow">Best sellers</p>
              <h2>Curated drops in PingMe Yellow.</h2>
            </div>
            <div className="collection-cards">
              {collections.map((collection) => (
                <div key={collection.label} className="collection-card">
                  <div>
                    <p className="accent">{collection.accent}</p>
                    <h3>{collection.label}</h3>
                    <p>{collection.description}</p>
                    <ul>
                      {collection.perks.map((perk) => (
                        <li key={perk}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-footer">
                    <span>{collection.price}</span>
                    <button className="primary ghost">{collection.cta}</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section testimonials" id="studio">
            <div className="section-header">
              <p className="eyebrow">Loved by creators</p>
              <h2>Ping moments our community is buzzing about.</h2>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.author}>
                  <p>“{testimonial.quote}”</p>
                  <cite>{testimonial.author}</cite>
                </blockquote>
              ))}
            </div>
          </section>

          <section className="section contact" id="contact">
            <div className="contact-card">
              <div>
                <p className="eyebrow">Let’s build your ping hub</p>
                <h2>Tell us where you want to stick your story.</h2>
                <p>
                  From automotive showrooms to boutique stores, PingMe decals convert idle attention
                  into real conversations.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <label>
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Aarav Patel"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="team@pingme.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Project
                  <textarea
                    name="project"
                    placeholder="Tell us about your drop, launch, or experience."
                    value={formData.project}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <button
                  type="submit"
                  className={`primary${formStatus.loading ? ' loading' : ''}`}
                  data-loading=" • sending..."
                  disabled={formStatus.loading}
                >
                  {formStatus.loading ? 'Booking' : 'Book a strategy call'}
                </button>
                {formStatus.message && (
                  <p className={`form-status ${formStatus.type}`}>{formStatus.message}</p>
                )}
              </form>
            </div>
          </section>
        </main>

        <footer>
          <div>
            <p>© {new Date().getFullYear()} PingMe Labs</p>
            <p>Privacy • Refund • Shipping • Terms</p>
          </div>
          <div className="footer-links">
            <a href="mailto:hello@pingme.com">hello@pingme.com</a>
            <a href="https://plzpingme.com" target="_blank" rel="noreferrer">
              Visit legacy site
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
