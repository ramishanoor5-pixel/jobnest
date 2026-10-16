import React from 'react';

export default function LoadingSpinner({ message = 'Loading open positions...' }) {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}
