import React from 'react';
import Navbar from '../components/Navbar';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{title}</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
          {description}
        </p>
        <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PlaceholderPage;
