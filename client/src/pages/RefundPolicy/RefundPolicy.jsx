// src/pages/RefundPolicy/RefundPolicy.jsx
import { PolicyLayout } from '../../layouts/PolicyLayout';

export const RefundPolicy = () => {
  return (
    <PolicyLayout>
      <h1>Refund Policy</h1>
      <span className="policy-date">Last updated: January 20, 2024</span>

      <p>
        Thank you for choosing PingMe. We want you to be completely satisfied with your purchase. This Refund Policy outlines the terms and conditions for refunds and returns.
      </p>

      <h2>30-Day Money-Back Guarantee</h2>
      <p>
        We offer a 30-day money-back guarantee on all PingMe tag purchases. If you're not satisfied with your purchase for any reason, you can request a full refund within 30 days of receiving your order.
      </p>

      <h2>Eligibility for Refunds</h2>
      <p>To be eligible for a refund, the following conditions must be met:</p>
      <ul>
        <li>The request must be made within 30 days of receiving the product</li>
        <li>The product must be unused and in its original packaging</li>
        <li>You must provide proof of purchase (order number or receipt)</li>
        <li>The product must not show signs of damage or tampering</li>
      </ul>

      <h2>Non-Refundable Items</h2>
      <p>The following items are not eligible for refunds:</p>
      <ul>
        <li>Digital products or services that have been accessed or downloaded</li>
        <li>Customized or personalized PingMe tags</li>
        <li>Products purchased during special promotional sales (unless defective)</li>
        <li>Gift cards or subscription services after they have been used</li>
      </ul>

      <h2>Refund Process</h2>
      <p>To initiate a refund, please follow these steps:</p>
      <ol>
        <li>Contact our customer support at <strong>support@pingme.com</strong></li>
        <li>Provide your order number and reason for the refund request</li>
        <li>Wait for our team to review your request (usually within 2-3 business days)</li>
        <li>If approved, ship the product back to us using the provided return label</li>
        <li>Once we receive and inspect the returned item, we will process your refund</li>
      </ol>

      <h2>Refund Timeline</h2>
      <ul>
        <li><strong>Approval:</strong> 2-3 business days after receiving your request</li>
        <li><strong>Return Shipping:</strong> 5-7 business days (depending on location)</li>
        <li><strong>Inspection:</strong> 1-2 business days after receiving the returned item</li>
        <li><strong>Refund Processing:</strong> 5-10 business days to your original payment method</li>
      </ul>

      <h2>Damaged or Defective Products</h2>
      <p>
        If you receive a damaged or defective product, please contact us immediately at <strong>support@pingme.com</strong> with photos of the damage. We will arrange for a replacement or full refund at no additional cost to you.
      </p>

      <h2>Shipping Costs</h2>
      <ul>
        <li>Original shipping costs are non-refundable</li>
        <li>Return shipping costs are the responsibility of the customer (unless the product is defective)</li>
        <li>We recommend using a trackable shipping service for returns</li>
      </ul>

      <h2>Exchanges</h2>
      <p>
        We currently do not offer direct exchanges. If you need a different product, please request a refund and place a new order.
      </p>

      <h2>Subscription Cancellations</h2>
      <p>
        For subscription services, you may cancel at any time. Refunds for subscription fees are prorated based on the unused portion of your subscription period.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about our Refund Policy, please contact us:
      </p>
      <p>
        <strong>Email:</strong> support@pingme.com<br />
        <strong>Phone:</strong> +91-XXXX-XXXXXX<br />
        <strong>Address:</strong> PingMe Technologies, India
      </p>
    </PolicyLayout>
  );
};
