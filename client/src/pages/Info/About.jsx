// src/pages/Info/About.jsx
import './infoPages.css';

const pillars = [
  {
    title: 'Privacy-first design',
    copy: 'PingMe never exposes personal numbers or socials. Every scan routes through encrypted relays with granular consent.'
  },
  {
    title: 'Hardware + software',
    copy: 'We print the decals, encode NFC tags, and ship them ready to plug into dashboards, CRMs, or no-code automations.'
  },
  {
    title: 'Realtime intelligence',
    copy: 'Heat maps, sentiment signals, and escalations feed into a single console so teams can respond faster.'
  }
];

const values = [
  'Craft bold experiences for physical spaces',
  'Champion independence for creators & SMB operators',
  'Ship reliable infrastructure for everyday teams',
  'Keep data portable with opt-in sharing'
];

export const About = () => {
  return (
    <section className="info-page">
      <div className="info-page__hero">
        <span className="info-pill">About PingMe</span>
        <h1>We transform static surfaces into living conversations.</h1>
        <p>
          PingMe spun out of field experiments with street vendors, parking lots, and indie brands who wanted
          a friendlier way to be discovered. Today we power thousands of decals and NFC touchpoints across
          India with the same scrappy energy.
        </p>
      </div>

      <div className="info-grid">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="info-card">
            <h3>{pillar.title}</h3>
            <p>{pillar.copy}</p>
          </article>
        ))}
      </div>

      <div className="info-section">
        <h2>What drives us</h2>
        <div className="info-card">
          <ul>
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="info-highlight">
        <strong>PingMe HQ</strong>
        <p>
          Based in Bengaluru, our hardware lab, design studio, and support pod sit under the same roof so we
          can iterate weekend-to-weekend with customers.
        </p>
      </div>
    </section>
  );
};
