import React from 'react';
import Navbar from '../components/Navbar';

const Privacy = () => {
  return (
    <div style={{ paddingBottom: '100px', backgroundColor: '#fdfdfc', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 20px' }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '48px', color: '#0f1923', marginBottom: '2rem' }}>Privacy Policy</h1>
        
        <div style={{ lineHeight: '1.6', color: '#4b5563', fontSize: '18px' }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '24px', color: '#0f1923', marginBottom: '1rem' }}>1. Data Collection</h2>
            <p>We collect information you provide directly to us when you create an account, build your skill profile, or post job requirements. This includes your name, email address, role (seeker or recruiter), and professional skills.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '24px', color: '#0f1923', marginBottom: '1rem' }}>2. How We Use Your Data</h2>
            <p>Your data is strictly used to match you with relevant opportunities. HireBridge uses a matching algorithm that compares seeker skills against job requirements. Your direct contact details are kept private and are only revealed when a mutual connection is unlocked.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '24px', color: '#0f1923', marginBottom: '1rem' }}>3. Data Retention & Security</h2>
            <p>We retain your profile data as long as your account is active. We do not sell your personal data to third parties. All payments are securely processed via Razorpay, and we do not store your credit card details on our servers.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', color: '#0f1923', marginBottom: '1rem' }}>4. Your Rights & Contact</h2>
            <p>You have the right to access, update, or delete your information at any time through your account settings. If you have questions about this privacy policy, please contact us at support@hirebridge.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
