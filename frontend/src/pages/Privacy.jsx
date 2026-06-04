import React from 'react';
import Navbar from '../components/Navbar';

const Privacy = () => {
  return (
    <div style={{ paddingBottom: '100px', backgroundColor: '#fdfdfc', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 20px' }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '48px', color: '#0f1923' }}>Privacy Policy</h1>
        <p style={{ marginTop: '20px', lineHeight: '1.6', color: '#4b5563', fontSize: '18px' }}>
          At HireBridge, we take your privacy seriously. Your profile data and contact information are kept strictly confidential and are only shared with recruiters or candidates when a mutual unlock occurs.
          <br /><br />
          We do not sell your personal data to third parties. All payment processing is securely handled by our payment partners (Razorpay).
        </p>
      </div>
    </div>
  );
};

export default Privacy;
