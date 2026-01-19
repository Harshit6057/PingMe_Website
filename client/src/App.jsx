import { useCallback, useEffect, useState } from 'react'
import { Link, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import logo from './assets/pingme-logo.png'
import tagCard from './assets/tag-card.png'
import pingWebsite from './assets/ping-website.png'

const resolveApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.trim().replace(/\/$/, '')
  }

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location
    return `${protocol}//${hostname}:5000`
  }

  return 'http://localhost:5000'
}

const API_URL = resolveApiBase()

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
  { label: 'Landing', path: '/' },
  { label: 'Home', path: '/home', requiresAuth: true },
  { label: 'Tag', hash: '#tag', requiresAuth: true },
  { label: 'Products', hash: '#products', requiresAuth: true },
  { label: 'Solutions', hash: '#solutions', requiresAuth: true },
  { label: 'Studio', hash: '#studio', requiresAuth: true },
  { label: 'Contact', hash: '#contact', requiresAuth: true }
]

const footerNav = {
  learnMore: [
    { label: 'About us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Terms of use', href: '#contact' },
    { label: 'Privacy policy', href: '#contact' },
    { label: 'Franchise', href: '#solutions' }
  ],
  company: [
    { label: 'Business terms', href: '#products' },
    { label: 'Refunds', href: '#contact' },
    { label: 'Shipping', href: '#contact' },
    { label: 'Download brochure', href: '#solutions', accent: true }
  ]
}

const footerQuestions = [
  {
    label: 'How Car PingMe Tag can reduce parking complaints in Delhi markets?',
    href: 'https://ngf132.com/blog/how-car-sampark-tag-can-reduce-parking-complaints-in-delhi-commercial-markets'
  },
  {
    label: 'How PingMe decals keep apartment driveways complaint-free?',
    href: '#solutions'
  },
  {
    label: 'Do I need separate tags for bike + helmet combos?',
    href: '#products'
  },
  {
    label: 'Can societies broadcast emergency notices with PingMe?',
    href: '#studio'
  },
  {
    label: 'How quickly can I update backup contacts?',
    href: '#contact'
  },
  {
    label: 'What makes PingMe safer than printing a phone number?',
    href: '#tag'
  }
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
  const [apiStatus, setApiStatus] = useState({ healthy: false, loading: true, message: 'Checking PingMe API…' })
  const [session, setSession] = useState(() => {
    const cached = localStorage.getItem('pingmeSession')
    return cached ? JSON.parse(cached) : null
  })
  const navigate = useNavigate()
  const location = useLocation()

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

  const refreshApiStatus = useCallback(async () => {
    setApiStatus((prev) => ({ ...prev, loading: true }))

    try {
      const response = await fetch(`${API_URL}/api/health`)
      if (!response.ok) {
        throw new Error('Health check failed')
      }
      const payload = await response.json()
      setApiStatus({
        healthy: true,
        loading: false,
        message: `API online · uptime ${Math.round(payload.uptime)}s`
      })
    } catch (error) {
      setApiStatus({
        healthy: false,
        loading: false,
        message: 'PingMe API unreachable. Start backend (npm start in /server) or set VITE_API_URL.'
      })
    }
  }, [])

  useEffect(() => {
    refreshApiStatus()
  }, [refreshApiStatus])

  useEffect(() => {
    if (location.pathname === '/home' && location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else if (!location.hash) {
      window.scrollTo({ top: 0 })
    }
  }, [location])

  useEffect(() => {
    if (session) {
      localStorage.setItem('pingmeSession', JSON.stringify(session))
    } else {
      localStorage.removeItem('pingmeSession')
    }
  }, [session])

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

  const handleLoginSuccess = (payload) => {
    setSession({ workspaceSlug: payload.workspaceSlug, lastLogin: payload.lastLogin })
    navigate('/home', { replace: true })
  }

  const handleLogout = () => {
    setSession(null)
    navigate('/', { replace: true })
  }

  const visibleLinks = navLinks.filter((link) => (session ? true : !link.requiresAuth))
  const renderLinkDestination = (link) => {
    if (link.path) {
      return link.path
    }

    return { pathname: '/home', hash: link.hash }
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
          {visibleLinks.map((link) => (
            <Link key={link.label} to={renderLinkDestination(link)}>
              {link.label}
            </Link>
          ))}
        </div>
        {session ? (
          <button className="secondary" type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : null}
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage session={session} />} />
        <Route
          path="/register"
          element={<RegisterPage apiStatus={apiStatus} refreshApiStatus={refreshApiStatus} />}
        />
        <Route
          path="/login"
          element={<LoginPage apiStatus={apiStatus} refreshApiStatus={refreshApiStatus} onLogin={handleLoginSuccess} />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute session={session}>
              <HomePage
                highlightStats={highlightStats}
                statsBand={statsBand}
                heroPanelHighlights={heroPanelHighlights}
                tagHighlights={tagHighlights}
                whatsappHighlights={whatsappHighlights}
                solutions={solutions}
                collections={collections}
                testimonials={testimonials}
                footerNav={footerNav}
                footerQuestions={footerQuestions}
                formData={formData}
                formStatus={formStatus}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                session={session}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

const ProtectedRoute = ({ session, children }) => {
  const location = useLocation()

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

const LandingPage = ({ session }) => {
  const landingMetrics = [
    { label: 'Communities onboarded', value: '1.2K+' },
    { label: 'Average response time', value: '58s' },
    { label: 'Masked connections routed', value: '2.5M+' }
  ]

  const featureCards = [
    {
      title: 'No phone numbers on display',
      copy: 'PingMe bridges every alert through a secure QR + NFC layer so your identity never leaks.'
    },
    {
      title: 'WhatsApp + Call relays',
      copy: 'Decide how people reach you — masked calls, WhatsApp, SMS, or emergency broadcast pulse.'
    },
    {
      title: 'Sampark OS toolkit',
      copy: 'Dashboards, doc lockers, and audit logs built for fleets, RWA, and ambitious founders.'
    }
  ]

  return (
    <main className="landing">
      <section className="landing-hero">
        <p className="eyebrow">PingMe · Sampark OS</p>
        <h1>Secure alerts that respect privacy and still reach the right human instantly.</h1>
        <p className="landing-copy">
          Spin up vehicle tags, shop counters, or whole communities with the same dashboard. Register to create a
          workspace or sign in to continue building your PingMe utilities.
        </p>

        <div className="landing-cta">
          <Link className="primary" to={session ? '/home' : '/register'}>
            {session ? 'Enter dashboard' : 'Create workspace'}
          </Link>
          <Link className="primary ghost" to={session ? '/home#contact' : '/login'}>
            {session ? 'Contact success team' : 'Already have an account?'}
          </Link>
        </div>

        <div className="landing-metrics">
          {landingMetrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.value}</span>
              <p>{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-grid">
        {featureCards.map((card) => (
          <article key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

const ApiStatusBanner = ({ apiStatus, refreshApiStatus }) => (
  <div className="api-status-card">
    <div>
      <p className="eyebrow">API status</p>
      <h3>{apiStatus.message}</h3>
      <span className={`status-pill ${apiStatus.healthy ? 'ok' : 'error'}`}>
        {apiStatus.loading ? 'Checking…' : apiStatus.healthy ? 'Online' : 'Offline'}
      </span>
    </div>
    <button type="button" className="secondary" onClick={refreshApiStatus} disabled={apiStatus.loading}>
      {apiStatus.loading ? 'Refreshing…' : 'Re-check now'}
    </button>
  </div>
)

const SecurityChecklist = () => (
  <div className="security-card">
    <h4>Security & diagnostics</h4>
    <ul>
      <li>Ensure the backend (npm start in /server) is running on port 5000.</li>
      <li>Confirm VITE_API_URL matches the backend URL when deploying.</li>
      <li>Never reuse admin credentials. Use unique workspace emails.</li>
      <li>Inspect DevTools → Network if you hit “Failed to fetch”.</li>
    </ul>
  </div>
)

const RegisterPage = ({ apiStatus, refreshApiStatus }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    workspace: '',
    phone: '',
    password: ''
  })
  const [status, setStatus] = useState({ type: '', message: '', loading: false })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '', loading: true })

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error?.error || 'Registration failed. Inspect server logs for details.')
      }

      const payload = await response.json()
      setStatus({ type: 'success', message: payload?.message || 'Workspace created. Redirecting to login…', loading: false })

      setTimeout(() => {
        navigate('/login', { replace: true, state: { email: formData.email, fromRegister: true } })
      }, 900)
    } catch (error) {
      setStatus({ type: 'error', message: error.message, loading: false })
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">Create workspace</p>
        <h2>Register your PingMe Sampark HQ</h2>
        <p className="auth-copy">
          Use your organisation or personal email. We will set up the initial workspace slug and share it inside the
          login response.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Ashna Rao" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@pinghq.in"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Workspace / org name
            <input
              type="text"
              name="workspace"
              placeholder="sampark-delhi"
              value={formData.workspace}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone (for escalations)
            <input type="tel" name="phone" placeholder="+91 90000 00000" value={formData.phone} onChange={handleChange} />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
          </label>

          <button
            type="submit"
            className={`primary ${status.loading ? 'loading' : ''}`}
            disabled={status.loading}
            data-loading="Creating workspace…"
          >
            {status.loading ? 'Creating workspace…' : 'Create & continue'}
          </button>
        </form>

        {status.message ? <p className={`form-status ${status.type}`}>{status.message}</p> : null}
        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>

      <aside className="auth-preview">
        <ApiStatusBanner apiStatus={apiStatus} refreshApiStatus={refreshApiStatus} />
        <SecurityChecklist />
      </aside>
    </div>
  )
}

const LoginPage = ({ apiStatus, refreshApiStatus, onLogin }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({ email: location.state?.email || '', password: '' })
  const [status, setStatus] = useState({ type: '', message: '', loading: false })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '', loading: true })

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error?.error || 'Login failed. Check credentials or backend status.')
      }

      const payload = await response.json()
      onLogin({
        workspaceSlug: payload?.workspaceSlug || 'demo-workspace',
        lastLogin: payload?.lastLogin || new Date().toISOString()
      })
    } catch (error) {
      setStatus({ type: 'error', message: error.message, loading: false })
      return
    }

    setStatus({ type: 'success', message: 'Authenticated. Redirecting…', loading: false })
    navigate('/home', { replace: true })
  }

  const redirectedMessage = location.state?.fromRegister

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">Access workspace</p>
        <h2>Log in to continue building PingMe flows</h2>
        {redirectedMessage ? <p className="auth-copy">Account created! Sign in to access the dashboard.</p> : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" name="email" placeholder="you@pinghq.in" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
          </label>
          <button
            type="submit"
            className={`primary ${status.loading ? 'loading' : ''}`}
            disabled={status.loading}
            data-loading="Verifying credentials…"
          >
            {status.loading ? 'Verifying…' : 'Login and continue'}
          </button>
        </form>

        {status.message ? <p className={`form-status ${status.type}`}>{status.message}</p> : null}
        <p className="auth-footer">
          Need a workspace? <Link to="/register">Create one now</Link>
        </p>
      </div>

      <aside className="auth-preview">
        <ApiStatusBanner apiStatus={apiStatus} refreshApiStatus={refreshApiStatus} />
        <SecurityChecklist />
      </aside>
    </div>
  )
}

const HomePage = ({
  highlightStats,
  statsBand,
  heroPanelHighlights,
  tagHighlights,
  whatsappHighlights,
  solutions,
  collections,
  testimonials,
  footerNav,
  footerQuestions,
  formData,
  formStatus,
  handleInputChange,
  handleSubmit,
  session
}) => (
  <main className="pingme-app">
    <section className="hero-section" id="about">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Welcome {session?.workspaceSlug ? `· ${session.workspaceSlug}` : 'back'} </p>
          <h1>
            Stop printing phone numbers. <span className="highlight">Start sending secure pings.</span>
          </h1>
          <p className="hero-description">
            PingMe bridges strangers, security teams, and communities through masked calls, WhatsApp relays, and document
            lockers so the right person is notified without exposing identities.
          </p>

          <div className="hero-cta">
            <Link to="/home#contact" className="primary">
              Book a deployment call
            </Link>
            <Link to="/home#products" className="primary ghost">
              Explore drops
            </Link>
          </div>

          <div className="hero-stats">
            {highlightStats.map((stat) => (
              <div key={stat.label}>
                <span>{stat.value}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-card" id="tag">
          <span className="hero-card__badge">Secure</span>
          <div className="hero-card__content">
            <h3>PingMe Studio 2.0</h3>
            <ul>
              <li>QR + NFC twins for every surface.</li>
              <li>Masked voice bridge for every alert.</li>
              <li>Role-based Sampark dashboard.</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            {heroPanelHighlights.map((panel) => (
              <article key={panel.title}>
                <h4>{panel.title}</h4>
                <p>{panel.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="stats-band">
      {statsBand.map((stat) => (
        <article key={stat.label}>
          <span>{stat.value}</span>
          <p>{stat.label}</p>
        </article>
      ))}
    </section>

    <section className="section tag-showcase" id="tag-section">
      <div className="tag-media">
        <img src={tagCard} alt="PingMe Sampark tag" />
        <p className="tag-caption">Weather-proof dual QR + NFC decals crafted for Indian cities.</p>
      </div>
      <div className="tag-details">
        <p className="eyebrow">Ping tag essentials</p>
        <h2>Every scan routes through your Sampark workspace.</h2>
        <div className="tag-grid">
          {tagHighlights.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className="tag-cta">
          <button className="primary" type="button">
            View catalogue
          </button>
          <button className="amazon-badge" type="button">
            Buy on Amazon
          </button>
        </div>
      </div>
    </section>

    <section className="section whatsapp-block" id="studio">
      <div className="whatsapp-media">
        <img src={pingWebsite} alt="PingMe web console" />
      </div>
      <div className="whatsapp-details">
        <p className="eyebrow">WhatsApp + SOS automations</p>
        <h2>Mask identities, still resolve the issue in seconds.</h2>
        <ul>
          {whatsappHighlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <Link to="/home#solutions" className="primary ghost">
          View automation playbooks
        </Link>
      </div>
    </section>

    <section className="section" id="solutions">
      <div className="section-header">
        <p className="eyebrow">Solutions</p>
        <h2>Choose a kit that matches your fleet, society, or retail format.</h2>
      </div>
      <div className="solutions-grid">
        {solutions.map((solution) => (
          <article key={solution.title}>
            <h3>{solution.title}</h3>
            <p>{solution.summary}</p>
            <ul>
              {solution.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="section" id="products">
      <div className="section-header">
        <p className="eyebrow">Collections</p>
        <h2>Limited drops built with the PingMe manufacturing crew.</h2>
      </div>
      <div className="collection-cards">
        {collections.map((collection) => (
          <article className="collection-card" key={collection.label}>
            <div>
              <span className="accent">{collection.accent}</span>
              <h3>{collection.label}</h3>
              <p>{collection.description}</p>
            </div>
            <ul>
              {collection.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <div className="card-footer">
              <span>{collection.price}</span>
              <button className="secondary" type="button">
                {collection.cta}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="section testimonials" id="studio">
      <div className="section-header">
        <p className="eyebrow">Studios & fleets</p>
        <h2>Why communities switch to PingMe Sampark.</h2>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.author}>
            <p>{testimonial.quote}</p>
            <cite>{testimonial.author}</cite>
          </blockquote>
        ))}
      </div>
    </section>

    <section className="section" id="contact">
      <div className="section-header">
        <p className="eyebrow">Contact</p>
        <h2>Tell us about your deployment. We respond within 24 hours.</h2>
      </div>
      <div className="contact-card">
        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          </label>
          <label>
            Project / requirement
            <textarea name="project" placeholder="Tell us where PingMe fits" value={formData.project} onChange={handleInputChange} required />
          </label>
          <button
            type="submit"
            className={`primary ${formStatus.loading ? 'loading' : ''}`}
            disabled={formStatus.loading}
            data-loading="Sending ping…"
          >
            {formStatus.loading ? 'Sending…' : 'Send a ping'}
          </button>
          {formStatus.message ? <p className={`form-status ${formStatus.type}`}>{formStatus.message}</p> : null}
        </form>

        <div>
          <h3>Whatsapp or call?</h3>
          <p>Mask your identity, still reach the right team. Business hours 9am – 9pm IST.</p>
          <a className="linkedin-pill" href="https://www.linkedin.com/company/pingme" target="_blank" rel="noreferrer">
            LinkedIn updates
          </a>
          <a className="location-pill" href="mailto:hello@pingme.studio">
            hello@pingme.studio
          </a>
        </div>
      </div>
    </section>

    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="PingMe logo" />
          <p>PingMe builds privacy-first Sampark products for riders, founders, and gated communities.</p>
          <button className="secondary" type="button">
            Download spec sheet
          </button>
        </div>
        <div className="footer-column">
          <h4>Learn more</h4>
          <ul>
            {footerNav.learnMore.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            {footerNav.company.map((link) => (
              <li key={link.label}>
                <a className={link.accent ? 'accent-link' : ''} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-questions">
        <div className="footer-questions__header">
          <span>Need quick answers?</span>
          <Link to="/home#contact" className="accent-link">
            Talk to support →
          </Link>
        </div>
        <div className="questions-grid">
          {footerQuestions.map((question) => (
            <a key={question.label} href={question.href} rel="noreferrer">
              {question.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  </main>
)

export default App