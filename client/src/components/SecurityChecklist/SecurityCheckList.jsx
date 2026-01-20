// src/components/SecurityChecklist/SecurityChecklist.jsx
import './SecurityChecklist.css';

export const SecurityChecklist = () => (
  <div className="security-checklist">
    <h4>Security & diagnostics</h4>
    <ul>
      <li>Ensure the backend is running on port 5000.</li>
      <li>Confirm VITE_API_URL matches the backend URL when deploying.</li>
      <li>Never reuse admin credentials. Use unique workspace emails.</li>
      <li>Inspect DevTools → Network if you hit "Failed to fetch".</li>
    </ul>
  </div>
);