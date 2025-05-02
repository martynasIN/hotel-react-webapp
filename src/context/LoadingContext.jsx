import React, { createContext, useState, useContext } from 'react';
import '../styles/base/loading.scss';

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Kraunama...</p>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);