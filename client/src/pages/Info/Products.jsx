// src/pages/Info/Products.jsx
import './infoPages.css';

const signatureKits = [
  {
    title: 'Signature QR Decals',
    description: 'Premium reflective decals that stay vibrant on windscreens, helmets, and storefronts.',
    bullets: ['Weather-proof vinyl', 'Custom colorways & typography', 'Ships with surface prep kit']
  },
  {
    title: 'Ping Tags',
    description: 'Compact NFC key tags that trigger your PingMe profile with a single tap.',
    bullets: ['Works with any smartphone', 'Assign to multiple profiles', 'Real-time analytics dashboard']
  },
  {
    title: 'Enterprise Packs',
    description: 'Bundle hardware + software for fleets, retail teams, or franchise networks.',
    bullets: ['Bulk onboarding assistance', 'Private analytics workspace', 'Dedicated success manager']
  }
];

const workflow = [
  {
    title: 'Design & Proof',
    copy: 'Upload artwork or pick from PingMe templates. Approve live previews within 24 hours.'
  },
  {
    title: 'Print & Encode',
    copy: 'We print, laminate, and encode every QR / NFC element with unique security keys.'
  },
  {
    title: 'Ship & Activate',
    copy: 'Track shipments inside the dashboard, stick the decals, and watch scans roll in instantly.'
  }
];

export const Products = () => {
  return (
    <section className="info-page">
      <div className="info-page__hero">
        <span className="info-pill">Products</span>
        <h1>Hardware built for bold, always-on identity.</h1>
        <p>
          From car windshields to merch drops, PingMe transforms every surface into a smart touchpoint
          with tamper-proof QR decals, NFC tags, and live analytics baked in.
        </p>
      </div>

      <div className="info-grid">
        {signatureKits.map((kit) => (
          <article key={kit.title} className="info-card">
            <h3>{kit.title}</h3>
            <p>{kit.description}</p>
            <ul>
              {kit.bullets.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="info-section">
        <h2>How fulfillment works</h2>
        <div className="info-grid">
          {workflow.map((step) => (
            <article key={step.title} className="info-card">
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="info-highlight">
        <strong>Need something custom?</strong>
        <p>
          PingMe engineers can match brand colors, embed holographic seals, or preload multi-language landing
          pages. Email <a href="mailto:studio@plzpingme.com">studio@plzpingme.com</a> to start.
        </p>
      </div>
    </section>
  );
};
