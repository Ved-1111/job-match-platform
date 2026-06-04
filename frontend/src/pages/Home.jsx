import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrap">
      <Navbar />

      {/* Hero */}
      <div className="home-hero" data-aos="fade-up">
        <div className="home-hero-eyebrow">🎯 Skill-based job matching</div>
        <h1>The bridge between <em>talent</em> and opportunity</h1>
        <p>HireBridge matches job seekers to recruiters by skills — not resumes. Connect directly, pay only when it counts.</p>
        <div className="home-hero-btns">
          <button className="btn-cta" onClick={() => navigate('/login')}>Find matching jobs &rarr;</button>
          <button className="btn-cta-outline" onClick={() => navigate('/login')}>I'm hiring talent</button>
        </div>
        <div className="home-stats">
          <div className="home-stat"><div className="stat-num">12<span>k+</span></div><div className="stat-label">Active seekers</div></div>
          <div className="home-stat"><div className="stat-num">3<span>k+</span></div><div className="stat-label">Jobs posted</div></div>
          <div className="home-stat"><div className="stat-num">89<span>%</span></div><div className="stat-label">Match accuracy</div></div>
          <div className="home-stat"><div className="stat-num">₹99</div><div className="stat-label">To unlock a contact</div></div>
        </div>
      </div>

      {/* Problems we solve */}
      <section className="problems" data-aos="fade-up">
        <div className="section-eyebrow">Why HireBridge exists</div>
        <h2 className="section-h2">Hiring is broken. We fixed it.</h2>
        <p className="section-sub">The same frustrations, on both sides. HireBridge was built to solve all of them.</p>
        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon">📨</div>
            <div className="problem-old">Applying into the void</div>
            <div className="problem-new">Get matched, not ignored</div>
            <p>Recruiters only see candidates who already fit their requirements — your profile reaches them automatically.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon">🔍</div>
            <div className="problem-old">Keyword-filtered out</div>
            <div className="problem-new">Skill-scored, not filtered</div>
            <p>We compare your actual skills against job requirements, not buzzwords. A 75% match beats a keyword mismatch every time.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon">💸</div>
            <div className="problem-old">Expensive subscriptions</div>
            <div className="problem-new">Pay only when you connect</div>
            <p>No monthly fees, no listing charges. ₹99 for seekers, ₹199 for recruiters — only when you decide to reach out.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon">🕐</div>
            <div className="problem-old">Weeks of waiting</div>
            <div className="problem-new">Matches in minutes</div>
            <p>As soon as your profile or job goes live, our algorithm runs instantly. No waiting for applications to trickle in.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon">🚪</div>
            <div className="problem-old">Gatekeepers everywhere</div>
            <div className="problem-new">Direct contact, always</div>
            <p>When you unlock a connection, you get their real email and phone number — no platform DMs, no middlemen.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon">🎭</div>
            <div className="problem-old">Spray-and-pray hiring</div>
            <div className="problem-new">Only serious connections</div>
            <p>Because both parties pay a small fee to connect, every unlock represents genuine interest — not mass outreach.</p>
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="for-who" data-aos="fade-up">
        <div className="for-who-inner">
          <div className="section-eyebrow">Who it's for</div>
          <h2 className="section-h2">Built for both sides</h2>
          <p className="section-sub">Whether you're looking for work or looking to hire, HireBridge removes the friction from both ends.</p>
          <div className="for-grid">
            <div className="for-card seeker">
              <div className="for-icon">👤</div>
              <h3>Job Seekers</h3>
              <p>Skip the application queue. Get matched to roles where your skills already fit and reach recruiters directly.</p>
              <ul className="for-features">
                <li><span>✓</span> Free profile & automatic matching</li>
                <li><span>✓</span> Browse all matches for free</li>
                <li><span>✓</span> Unlock recruiter contact for ₹99</li>
                <li><span>✓</span> No subscriptions, ever</li>
              </ul>
              <button className="for-btn" onClick={() => navigate('/login')}>Create free profile &rarr;</button>
            </div>
            <div className="for-card recruiter">
              <div className="for-icon">🏢</div>
              <h3>Recruiters</h3>
              <p>Post your requirements and get a ranked list of pre-qualified candidates — without waiting for a single application.</p>
              <ul className="for-features">
                <li><span>✓</span> Free job posting, live instantly</li>
                <li><span>✓</span> See match scores before paying</li>
                <li><span>✓</span> Unlock candidate contact for ₹199</li>
                <li><span>✓</span> No listing fees or monthly plans</li>
              </ul>
              <button className="for-btn" onClick={() => navigate('/login')}>Post your first job &rarr;</button>
            </div>
          </div>
        </div>
      </section>

      {/* HireBridge vs Traditional */}
      <section className="vs" data-aos="fade-up">
        <div className="section-eyebrow">The difference</div>
        <h2 className="section-h2">HireBridge vs traditional job boards</h2>
        <p className="section-sub">See exactly what makes us different from the platforms you've used before.</p>
        <div className="vs-table-wrap">
          <table className="vs-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th><span className="col-hb">HireBridge</span></th>
                <th><span className="col-old">Traditional boards</span></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Automatic skill-based matching</td><td><span className="yes">✓</span></td><td><span className="no">✗</span></td></tr>
              <tr><td>Free to post jobs / create profile</td><td><span className="yes">✓</span></td><td><span className="no">✗</span></td></tr>
              <tr><td>See match score before paying</td><td><span className="yes">✓</span></td><td><span className="no">✗</span></td></tr>
              <tr><td>Direct contact details on unlock</td><td><span className="yes">✓</span></td><td><span className="no">✗</span></td></tr>
              <tr><td>No monthly subscription required</td><td><span className="yes">✓</span></td><td><span className="no">✗</span></td></tr>
              <tr><td>Both sides verify genuine interest</td><td><span className="yes">✓</span></td><td><span className="no">✗</span></td></tr>
              <tr><td>Candidate privacy protected until unlock</td><td><span className="yes">✓</span></td><td><span className="no">✗</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" data-aos="fade-up">
        <div className="testimonials-inner">
          <div className="section-eyebrow">Testimonials</div>
          <h2 className="section-h2">What people are saying</h2>
          <p className="section-sub">Early users from across India on their HireBridge experience.</p>
          <div className="test-grid">
            <div className="test-card">
              <div className="test-quote">"I got matched to 8 relevant roles in the first week. Unlocked two recruiters and had interviews within days. Worth every rupee."</div>
              <div className="test-author">
                <div className="test-avatar" style={{ background: '#e8f0fe', color: '#1a6af4' }}>AR</div>
                <div><div className="test-name">Arjun Rao</div><div className="test-role">Frontend Developer &middot; Bengaluru</div></div>
              </div>
            </div>
            <div className="test-card">
              <div className="test-quote">"We posted a React role and had 14 pre-qualified candidates ranked by score the same day. We hired in under two weeks."</div>
              <div className="test-author">
                <div className="test-avatar" style={{ background: '#e6f9f1', color: '#0ea86a' }}>PS</div>
                <div><div className="test-name">Priya Sharma</div><div className="test-role">Engineering Lead &middot; Mumbai</div></div>
              </div>
            </div>
            <div className="test-card">
              <div className="test-quote">"Finally a platform that doesn't make you apply into a void. The match score told me exactly where I stood before I paid anything."</div>
              <div className="test-author">
                <div className="test-avatar" style={{ background: '#fef3c7', color: '#b45309' }}>KM</div>
                <div><div className="test-name">Kavya Menon</div><div className="test-role">Full Stack Engineer &middot; Pune</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="trust" data-aos="fade-in">
        <div className="trust-label">Talent from companies like</div>
        <div className="trust-logos">
          <div className="trust-logo">Zepto</div>
          <div className="trust-logo">Razorpay</div>
          <div className="trust-logo">Groww</div>
          <div className="trust-logo">Meesho</div>
          <div className="trust-logo">CRED</div>
          <div className="trust-logo">Swiggy</div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="home-cta-block" data-aos="fade-up">
        <h2>Your next opportunity is <em>already waiting</em></h2>
        <p>Join thousands of professionals and recruiters already connecting on HireBridge.</p>
        <div className="cta-btns">
          <button className="btn-cta" onClick={() => navigate('/login')}>I'm looking for a job &rarr;</button>
          <button className="btn-cta-outline" onClick={() => navigate('/login')}>I'm hiring talent</button>
        </div>
        <div className="cta-note">Free to join &middot; No subscription &middot; Pay only when you connect</div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">Hire<span>Bridge</span></div>
        <div className="footer-links">
          <Link to="/jobs">Find Jobs</Link>
          <Link to="/for-recruiters">For Recruiters</Link>
          <Link to="/how-it-works">How it Works</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
        <div className="footer-copy">&copy; 2025 HireBridge</div>
      </footer>
    </div>
  );
};

export default Home;
