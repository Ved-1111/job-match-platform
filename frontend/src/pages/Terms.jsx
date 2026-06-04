import React from 'react';
import Navbar from '../components/Navbar';

const Terms = () => {
  return (
    <div style={{ paddingBottom: '100px', backgroundColor: '#fdfdfc', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 20px' }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '48px', color: '#0f1923' }}>Terms of Service</h1>
        <p style={{ marginTop: '20px', lineHeight: '1.6', color: '#4b5563', fontSize: '18px' }}>
          By using HireBridge, you agree to provide an accurate representation of your skills, identity, and requirements. 
          <br /><br />
          Payments made to unlock connections are one-time fees and are strictly non-refundable, as the service (providing contact details) is rendered immediately upon transaction completion.
        </p>
      </div>
    </div>
  );
};

export default Terms;
