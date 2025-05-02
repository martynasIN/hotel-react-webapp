import React from 'react';

function NotFound() {
  return (
    <div className="not-found-container" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Puslapis nerastas</h1>
      <p>Atsiprašome, bet ieškomas puslapis neegzistuoja.</p>
      <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>Grįžti į pagrindinį puslapį</a>
    </div>
  );
}

export default NotFound;