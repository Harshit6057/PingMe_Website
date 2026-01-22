// src/pages/Info/Contact.jsx
import './infoPages.css';

const supportChannels = [
  {
    title: 'Customer Support',
    details: ['WhatsApp: +91 73473 40000', 'Email: care@plzpingme.com', 'Weekdays 9am – 9pm IST']
  },
  {
    title: 'Partner Sales',
    details: ['Email: partners@plzpingme.com', 'Deployment playbooks for dealers & agencies', 'Volume pricing + co-brand assets']
  },
  {
    title: 'Press & Media',
    details: ['press@plzpingme.com', 'Shoot-ready demo kits', 'Founder interviews & story pitches']
  }
];

export const Contact = () => (
  <section className="info-page">
    <div className="info-page__hero">
      <span className="info-pill">Contact</span>
      <h1>Talk to the PingMe crew.</h1>
      <p>
        Whether you need decals for a fleet, want to white-label the platform, or just need help setting up
        your first PingMe profile, we are one WhatsApp away.
      </p>
    </div>

    <div className="info-grid">
      {supportChannels.map(({ title, details }) => (
        <article key={title} className="info-card">
          <h3>{title}</h3>
          <ul>
            {details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>

    <div className="info-section">
      <h2>Office</h2>
      <div className="info-card">
        <p>
          PingMe Studio, 3rd Floor, 12th Main, Indiranagar, Bengaluru · Karnataka 560038 · India
        </p>
        <p>Walk-ins welcome with prior slot. Pickup kiosk available for urgent swaps.</p>
      </div>
    </div>

    <div className="info-highlight">
      <strong>Need instant help?</strong>
      <p>
        DM <a href="https://instagram.com/plzpingme" target="_blank" rel="noreferrer">@plzpingme</a> on Instagram
        or ping our community on Discord for 24/7 response.
      </p>
    </div>
  </section>
);
