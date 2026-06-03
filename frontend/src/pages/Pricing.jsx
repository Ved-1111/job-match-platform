import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Pricing.css';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="pricing-wrap">
      <Navbar />

      <div className="pricing-hero">
        <div className="pricing-eyebrow">Pricing</div>
        <h1>Pay only when you <em>connect</em></h1>
        <p>No subscriptions. No listing fees. You pay once, only when you decide a match is worth pursuing.</p>
      </div>

      <section className="plans">
        <div className="plans-label">Plans</div>
        <h2>Simple pricing for both sides</h2>
        <div className="plans-grid">
          <div className="plan-card">
            <div className="plan-type seeker">Job Seeker</div>
            <div className="plan-name">Seeker Plan</div>
            <div className="plan-price">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <div className="free-label">Free</div>
                <span style={{ fontSize: '13px', color: '#8896a5' }}>to join</span>
              </div>
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '36px', color: '#0f1923' }}>₹99</div>
                <span style={{ fontSize: '13px', color: '#8896a5' }}>per recruiter unlock</span>
              </div>
              <div className="price-unit">Only pay when you want to reach out</div>
            </div>
            <div className="plan-desc">Create your profile for free, get matched automatically, and browse all your matches without spending anything. Pay ₹99 only when a specific match looks right.</div>
            <ul className="plan-features">
              <li><span className="check">✓</span> Free profile creation</li>
              <li><span className="check">✓</span> Automatic skill-based matching</li>
              <li><span class="check">✓</span> Unlimited match browsing</li>
              <li><span className="check">✓</span> Match score visible before paying</li>
              <li><span className="check">✓</span> Recruiter contact revealed on unlock</li>
              <li><span className="check">✓</span> No subscription or monthly fees</li>
              <li><span className="cross">✗</span> Cannot post job listings</li>
            </ul>
            <button className="plan-btn green" onClick={() => navigate('/login')}>Create free profile &rarr;</button>
          </div>

          <div className="plan-card featured">
            <div className="featured-badge">Most popular</div>
            <div className="plan-type recruiter">Recruiter</div>
            <div className="plan-name">Recruiter Plan</div>
            <div className="plan-price">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <div className="free-label">Free</div>
                <span style={{ fontSize: '13px', color: '#8896a5' }}>to post jobs</span>
              </div>
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '36px', color: '#0f1923' }}>₹199</div>
                <span style={{ fontSize: '13px', color: '#8896a5' }}>per candidate unlock</span>
              </div>
              <div className="price-unit">Only pay when you want to contact someone</div>
            </div>
            <div className="plan-desc">Post jobs for free and receive ranked candidate matches instantly. See match scores and skills before committing. Pay ₹199 only when you're ready to reach out.</div>
            <ul className="plan-features">
              <li><span className="check">✓</span> Free job posting — no listing fees</li>
              <li><span className="check">✓</span> Unlimited candidate matches visible</li>
              <li><span className="check">✓</span> Candidate ranked by match score</li>
              <li><span className="check">✓</span> Skills & experience shown before paying</li>
              <li><span className="check">✓</span> Direct contact details on unlock</li>
              <li><span className="check">✓</span> Multiple job posts supported</li>
              <li><span className="check">✓</span> No subscription or monthly fees</li>
            </ul>
            <button className="plan-btn blue" onClick={() => navigate('/login')}>Post your first job &rarr;</button>
          </div>
        </div>
      </section>

      <section className="compare">
        <div className="compare-inner">
          <div className="section-label">Feature comparison</div>
          <h2 className="section-h2">What's included</h2>
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{ width: '50%' }}>Feature</th>
                <th><span className="col-head green">Seeker</span></th>
                <th><span className="col-head blue">Recruiter</span></th>
              </tr>
            </thead>
            <tbody>
              <tr className="section-row"><td colSpan="3">Profile & Listings</td></tr>
              <tr><td>Create an account</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td>Build a skill profile</td><td><span className="yes">✓</span></td><td><span className="no">—</span></td></tr>
              <tr><td>Post job requirements</td><td><span className="no">—</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td>Multiple active job posts</td><td><span className="no">—</span></td><td><span className="yes">✓</span></td></tr>

              <tr className="section-row"><td colSpan="3">Matching</td></tr>
              <tr><td>Automatic skill-based matching</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td>Browse all matches for free</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td>See match score before paying</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td>Skill breakdown visible</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>

              <tr className="section-row"><td colSpan="3">Unlocking contacts</td></tr>
              <tr><td>Unlock recruiter contact</td><td>₹99 per unlock</td><td><span className="no">—</span></td></tr>
              <tr><td>Unlock candidate contact</td><td><span className="no">—</span></td><td>₹199 per unlock</td></tr>
              <tr><td>Direct email & phone revealed</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td>No subscription required</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>

              <tr className="section-row"><td colSpan="3">Payments & Security</td></tr>
              <tr><td>Powered by Razorpay</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td>No card stored on HireBridge</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td>Instant payment confirmation</td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="trust">
        <div className="trust-label">Why it works</div>
        <div className="trust-h2">Built to be fair for everyone</div>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">🔒</div>
            <h4>Mutual privacy</h4>
            <p>Neither party can see the other's contact details until they independently choose to pay. Full control, always.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">⚖️</div>
            <h4>Skin in the game</h4>
            <p>Both sides pay a small fee, which means only genuine connections happen — no spam, no ghost listings.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">💳</div>
            <h4>Secure payments</h4>
            <p>All transactions go through Razorpay — PCI-DSS compliant. Your card details are never stored by HireBridge.</p>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="faq-inner">
          <div className="faq-label">FAQs</div>
          <div className="faq-h2">Pricing questions answered</div>
          <div className="faq-item">
            <div className="faq-q">Do I need to pay to sign up or post a job?</div>
            <div className="faq-a">No. Creating a profile as a job seeker and posting job requirements as a recruiter are both completely free. You only pay when you want to unlock a specific contact.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What exactly do I get when I pay ₹99 or ₹199?</div>
            <div className="faq-a">You get the other party's direct contact details — their name, email address, and phone number. From there you connect however you prefer, with no platform in between.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Does the other person know I unlocked their contact?</div>
            <div className="faq-a">Yes — both parties receive a notification when a connection is unlocked. This way everyone knows a genuine interest has been expressed before any outreach happens.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Can I get a refund if the contact doesn't respond?</div>
            <div className="faq-a">Unlocks are non-refundable since the contact information is delivered instantly. We recommend reviewing the match score and skill fit carefully before unlocking — all that information is free to view beforehand.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Will pricing change in the future?</div>
            <div className="faq-a">Current pricing is introductory. Any price changes will be communicated well in advance and will never affect unlocks you've already paid for.</div>
          </div>
        </div>
      </section>

      <div className="pricing-cta-block">
        <h2>Start for free today</h2>
        <p>No credit card needed to sign up. Pay only when you're ready to connect.</p>
        <div className="cta-btns">
          <button className="btn-cta" onClick={() => navigate('/login')}>I'm looking for a job &rarr;</button>
          <button className="btn-cta-outline" onClick={() => navigate('/login')}>I'm hiring &rarr;</button>
        </div>
        <div className="pricing-cta-note">Free to join &middot; No subscription &middot; Pay only when you connect</div>
      </div>
    </div>
  );
};

export default Pricing;
