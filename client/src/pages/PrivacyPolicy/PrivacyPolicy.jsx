// src/pages/PrivacyPolicy/PrivacyPolicy.jsx
import { PolicyLayout } from '../../layouts/PolicyLayout';

export const PrivacyPolicy = () => {
  return (
    <PolicyLayout>
      <h1>Privacy Policy</h1>
      <span className="policy-date">Last updated: January 20, 2024</span>

      <p>
        At PingMe, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect information that you provide directly to us, including:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details</li>
        <li><strong>Account Information:</strong> Username, password, and workspace preferences</li>
        <li><strong>Usage Data:</strong> Information about how you use our services, including QR scans, tags created, and interaction patterns</li>
        <li><strong>Device Information:</strong> Device type, operating system, browser type, and IP address</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Process your transactions and send related information</li>
        <li>Send you technical notices, updates, and security alerts</li>
        <li>Respond to your comments, questions, and customer service requests</li>
        <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
        <li>Detect, prevent, and address technical issues and fraudulent activity</li>
      </ul>

      <h2>Information Sharing and Disclosure</h2>
      <p>
        We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
      </p>
      <ul>
        <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
        <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
        <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
      </ul>

      <h2>Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
      </p>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access, update, or delete your personal information</li>
        <li>Object to processing of your personal data</li>
        <li>Request restriction of processing your personal data</li>
        <li>Data portability</li>
        <li>Withdraw consent at any time</li>
      </ul>

      <h2>Cookies and Tracking Technologies</h2>
      <p>
        We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at:
      </p>
      <p>
        <strong>Email:</strong> privacy@pingme.com<br />
        <strong>Address:</strong> PingMe Technologies, India
      </p>
    </PolicyLayout>
  );
};
