// src/components/Input/Input.jsx
import './Input.css';

export const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  error = '',
  ...props 
}) => (
  <label className="form-group">
    {label && <span className="form-label">{label}</span>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`form-control ${error ? 'error' : ''}`}
      {...props}
    />
    {error && <span className="error-message">{error}</span>}
  </label>
);