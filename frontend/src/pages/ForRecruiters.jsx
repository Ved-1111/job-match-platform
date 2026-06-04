import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ForRecruiters.css';

const ForRecruiters = () => {
  const navigate = useNavigate();

  return (
    <div className="recruiter-wrap">
      <Navbar />

      <div className="recruiter-hero" data-aos="fade-up">
        <div className="recruiter-eyebrow">For Recruiters</div>
        <h1>Get matched to candidates that <em>fit your role</em></h1>
        <p>HireBridge connects your open roles directly with active job seekers — no spam, no waiting, no noise.</p>
        <button className="btn-cta" onClick={() => navigate('/login')}>Post your first job &rarr;</button>
      </div>

      <section className="steps" data-aos="fade-up">
        <div className="steps-label">How it works</div>
        <h2>Three steps to your next hire</h2>

        <div className="step">
          <div className="step-num">1</div>
          <div className="step-body">
            <h3>Post your job requirements</h3>
            <p>Add the required skills, location, and the kind of candidate you're looking for. No lengthy job descriptions — just the details that matter.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-num">2</div>
          <div className="step-body">
            <h3>Get matched automatically</h3>
            <p>Our algorithm scores active candidates against your job posting. When their skills hit 60% or more of your requirements, a match is created — instantly.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-num">3</div>
          <div className="step-body">
            <h3>Unlock and connect for ₹99</h3>
            <p>When a match looks right, pay a one-time ₹99 fee to reveal the candidate's contact details. No subscriptions, no recruiting agencies — just a direct line to the right person.</p>
          </div>
        </div>
      </section>

      <section className="benefits" data-aos="fade-up">
        <div className="benefits-inner">
          <div className="benefits-label">Why HireBridge</div>
          <h2>Built differently, for your benefit</h2>
          <div className="benefit-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h4>Only relevant candidates</h4>
              <p>You only see candidates whose skills already match. No screening through hundreds of unqualified resumes.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔒</div>
              <h4>Candidate privacy respected</h4>
              <p>You can't see their contact info until you choose to unlock the connection, ensuring high-quality, intent-driven outreach.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h4>Skip the sourcing stage</h4>
              <p>Matched candidates are already interested in your role profile. You skip the cold-outreach stage entirely.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💸</div>
              <h4>Pay only when it counts</h4>
              <p>Posting a job is free. You only pay ₹99 when you decide a specific matched candidate is worth interviewing.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-block" data-aos="fade-up">
        <h2>Ready to make your next hire?</h2>
        <p>Join thousands of companies already finding top talent on HireBridge.</p>
        <button className="btn-cta" onClick={() => navigate('/login')}>Log in to get started &rarr;</button>
        <div className="cta-note">Free to post &middot; No subscription &middot; Pay only when you connect</div>
      </div>
    </div>
  );
};

export default ForRecruiters;
