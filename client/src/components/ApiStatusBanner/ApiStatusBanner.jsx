// src/components/ApiStatusBanner/ApiStatusBanner.jsx
import './ApiStatusBanner.css';

export const ApiStatusBanner = ({ apiStatus, refreshApiStatus }) => {
  return (
    <div className="api-status-banner">
      <div className={`status-indicator ${apiStatus.healthy ? 'online' : 'offline'}`}></div>
      <span className="status-message">{apiStatus.message}</span>
      <button 
        onClick={refreshApiStatus} 
        className="refresh-btn"
        disabled={apiStatus.loading}
      >
        {apiStatus.loading ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  );
};