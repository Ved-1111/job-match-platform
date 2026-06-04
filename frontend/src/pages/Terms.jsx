import React from 'react';
import Navbar from '../components/Navbar';

const Terms = () => {
  return (
    <div style={{ paddingBottom: '100px', backgroundColor: '#fdfdfc', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 20px' }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '48px', color: '#0f1923', marginBottom: '2rem' }}>Terms of Service</h1>
        
        <div style={{ lineHeight: '1.6', color: '#4b5563', fontSize: '18px' }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '24px', color: '#0f1923', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
            <p>By creating an account on HireBridge, you agree to abide by these Terms of Service. You must provide an accurate representation of your identity, skills, and job requirements. Fake profiles or misleading job postings will result in immediate account termination.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '24px', color: '#0f1923', marginBottom: '1rem' }}>2. Payments and Refunds</h2>
            <p>HireBridge operates on a pay-per-connection model. Payments made to unlock a connection's contact details (₹99 for seekers, ₹199 for recruiters) are one-time fees. These fees are strictly non-refundable, as the service is rendered immediately upon transaction completion.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '24px', color: '#0f1923', marginBottom: '1rem' }}>3. User Conduct</h2>
            <p>You agree to use HireBridge solely for the purpose of genuine recruitment or job seeking. Scraping data, harassing users, or using unlocked contact information for spam or marketing purposes is strictly prohibited.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', color: '#0f1923', marginBottom: '1rem' }}>4. Modifications to Service</h2>
            <p>HireBridge reserves the right to modify or discontinue the service with or without notice. We also reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
