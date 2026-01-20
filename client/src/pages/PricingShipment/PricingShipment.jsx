// src/pages/PricingShipment/PricingShipment.jsx
import { PolicyLayout } from '../../layouts/PolicyLayout';

export const PricingShipment = () => {
  return (
    <PolicyLayout>
      <h1>Pricing & Shipment Policy</h1>
      <span className="policy-date">Last updated: January 20, 2024</span>

      <p>
        This document outlines our pricing structure and shipping policies for PingMe products and services.
      </p>

      <h2>Product Pricing</h2>
      
      <h3>Individual PingMe Tags</h3>
      <ul>
        <li><strong>Standard PingMe Tag:</strong> ₹499 per unit</li>
        <li><strong>Premium NFC Tag:</strong> ₹799 per unit</li>
        <li><strong>Dual Bike + Helmet Pack:</strong> ₹1,499 (includes 2 synchronized tags)</li>
        <li><strong>Family Pack (5 tags):</strong> ₹2,199 (save 12%)</li>
      </ul>

      <h3>Business Solutions</h3>
      <ul>
        <li><strong>Business Sampark Kit (10 tags):</strong> ₹3,999</li>
        <li><strong>Enterprise Package (50 tags):</strong> ₹17,999</li>
        <li><strong>White-label Solution:</strong> Custom pricing (contact sales)</li>
      </ul>

      <h3>Subscription Services</h3>
      <ul>
        <li><strong>Basic Plan:</strong> Free (limited features)</li>
        <li><strong>Pro Plan:</strong> ₹99/month (advanced analytics + priority support)</li>
        <li><strong>Business Plan:</strong> ₹499/month (unlimited tags + team access + API access)</li>
      </ul>

      <h2>Taxes and Additional Fees</h2>
      <p>
        All prices are inclusive of applicable GST (Goods and Services Tax). Additional fees may apply:
      </p>
      <ul>
        <li>Customization charges for branded tags: ₹200-500 per design</li>
        <li>Express shipping: Additional ₹100-300 depending on location</li>
        <li>International shipping: Custom quotes based on destination</li>
      </ul>

      <h2>Shipping Policy</h2>

      <h3>Domestic Shipping (India)</h3>
      <ul>
        <li><strong>Standard Shipping:</strong> 5-7 business days (Free for orders above ₹999)</li>
        <li><strong>Express Shipping:</strong> 2-3 business days (₹100 additional charge)</li>
        <li><strong>Same-Day Delivery:</strong> Available in select metro cities (₹300 additional charge)</li>
      </ul>

      <h3>Shipping Charges</h3>
      <ul>
        <li>Orders below ₹999: ₹50 flat shipping fee</li>
        <li>Orders above ₹999: Free standard shipping</li>
        <li>Bulk orders (50+ units): Free express shipping</li>
      </ul>

      <h3>International Shipping</h3>
      <p>
        We currently ship to the following countries:
      </p>
      <ul>
        <li>USA, UK, Canada, Australia: 10-15 business days</li>
        <li>Middle East (UAE, Saudi Arabia, Qatar): 7-10 business days</li>
        <li>Southeast Asia (Singapore, Malaysia, Thailand): 5-7 business days</li>
      </ul>
      <p>International shipping costs are calculated at checkout based on weight and destination.</p>

      <h2>Order Processing Time</h2>
      <ul>
        <li>Standard orders: Processed within 1-2 business days</li>
        <li>Custom/branded orders: Processed within 3-5 business days</li>
        <li>Bulk orders: Processed within 5-7 business days</li>
      </ul>

      <h2>Tracking Your Order</h2>
      <p>
        Once your order ships, you will receive:
      </p>
      <ul>
        <li>Email notification with tracking number</li>
        <li>SMS updates on shipment status</li>
        <li>Real-time tracking via our website or mobile app</li>
      </ul>

      <h2>Delivery Attempts</h2>
      <ul>
        <li>Our courier partners will make up to 3 delivery attempts</li>
        <li>If delivery fails after 3 attempts, the package will be returned to us</li>
        <li>Return shipping fees will apply for reshipment</li>
      </ul>

      <h2>Undeliverable Shipments</h2>
      <p>
        If your package is returned to us due to incorrect address or failed delivery attempts:
      </p>
      <ul>
        <li>You will be notified within 24 hours of the return</li>
        <li>Reshipment charges will apply (₹50-200 depending on location)</li>
        <li>Alternatively, you may request a refund (minus original shipping costs)</li>
      </ul>

      <h2>Damaged or Lost Shipments</h2>
      <p>
        If your package arrives damaged or is lost in transit:
      </p>
      <ul>
        <li>Contact us immediately at <strong>support@pingme.com</strong></li>
        <li>Provide photos of damaged packaging/products</li>
        <li>We will arrange for a replacement or full refund within 48 hours</li>
      </ul>

      <h2>Payment Methods</h2>
      <p>We accept the following payment methods:</p>
      <ul>
        <li>Credit/Debit Cards (Visa, Mastercard, RuPay, American Express)</li>
        <li>UPI (Google Pay, PhonePe, Paytm, BHIM)</li>
        <li>Net Banking</li>
        <li>Wallets (Paytm, Amazon Pay, Mobikwik)</li>
        <li>Cash on Delivery (COD) - Available for orders below ₹5,000</li>
      </ul>

      <h2>Price Changes</h2>
      <p>
        Prices are subject to change without prior notice. However, orders placed before a price change will honor the original price.
      </p>

      <h2>Contact Us</h2>
      <p>
        For questions about pricing or shipping, please contact us:
      </p>
      <p>
        <strong>Email:</strong> orders@pingme.com<br />
        <strong>Phone:</strong> +91-XXXX-XXXXXX<br />
        <strong>WhatsApp:</strong> +91-XXXX-XXXXXX
      </p>
    </PolicyLayout>
  );
};
