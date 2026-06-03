import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './HowItWorks.css';

const HowItWorks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('seeker');

  return (
    <div className="how-it-works-wrap">
      <Navbar />

      <div className="hiw-hero">
        <div className="hiw-eyebrow">How it Works</div>
        <h1>The <em>right match,</em> for both sides</h1>
        <p>HireBridge works differently — no applications, no guessing. Just skill-based matching that connects the right people at the right time.</p>
      </div>

      <div className="toggle-section">
        <div className="toggle">
          <button 
            className={`toggle-btn ${activeTab === 'seeker' ? 'active' : ''}`} 
            onClick={() => setActiveTab('seeker')}
          >
            I'm a Job Seeker
          </button>
          <button 
            className={`toggle-btn ${activeTab === 'recruiter' ? 'active' : ''}`} 
            onClick={() => setActiveTab('recruiter')}
          >
            I'm a Recruiter
          </button>
        </div>
      </div>

      <div className="journey">
        {activeTab === 'seeker' && (
          <div className="journey-panel active">
            <div className="journey-label">Job Seeker Journey</div>
            <h2>From profile to offer</h2>
            <div className="timeline">
              <div className="tl-step">
                <div className="tl-dot">1</div>
                <div className="tl-card">
                  <h3>Create your free profile</h3>
                  <p>Sign up and add your skills, experience level, preferred work mode, and location. No resume uploads required — just the essentials that help our algorithm match you accurately.</p>
                  <span className="tl-tag blue">Free &middot; Takes 5 minutes</span>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-dot green">2</div>
                <div className="tl-card">
                  <h3>Get automatically matched</h3>
                  <p>As soon as your profile is live, our matching engine compares your skills against every active job posting. Any job where you meet 60% or more of the requirements appears in your matches — ranked by score.</p>
                  <span className="tl-tag green">Automatic &middot; No applying needed</span>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-dot amber">3</div>
                <div className="tl-card">
                  <h3>Review your matches</h3>
                  <p>Browse your personalised match list. Each card shows the role, company, match percentage, required skills, salary range, and work mode — so you can evaluate before spending anything.</p>
                  <span className="tl-tag blue">Free to browse</span>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-dot">4</div>
                <div className="tl-card">
                  <h3>Unlock the recruiter's contact for ₹99</h3>
                  <p>When a match looks right, pay a one-time ₹99 to reveal the recruiter's name, email, and phone number. Reach out directly — on your terms, in your own words.</p>
                  <span className="tl-tag amber">₹99 one-time &middot; No subscription</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recruiter' && (
          <div className="journey-panel active">
            <div className="journey-label">Recruiter Journey</div>
            <h2>From requirement to hire</h2>
            <div className="timeline">
              <div className="tl-step">
                <div className="tl-dot">1</div>
                <div className="tl-card">
                  <h3>Post your job requirements</h3>
                  <p>Create an account and post the role — add the job title, required skills, experience range, salary, and work mode. Your listing goes live instantly and starts matching immediately.</p>
                  <span className="tl-tag blue">Free to post &middot; Live in minutes</span>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-dot green">2</div>
                <div className="tl-card">
                  <h3>Receive ranked candidate matches</h3>
                  <p>HireBridge automatically scores every job seeker's profile against your requirements. You get a ranked list of candidates — sorted by match percentage — without waiting for anyone to apply.</p>
                  <span className="tl-tag green">Automatic &middot; No job boards needed</span>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-dot amber">3</div>
                <div className="tl-card">
                  <h3>Review candidates before paying</h3>
                  <p>See each candidate's skill set, match score, experience level, and location before committing to anything. Only pay when you're confident a candidate is worth reaching out to.</p>
                  <span className="tl-tag blue">Free to browse all matches</span>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-dot">4</div>
                <div className="tl-card">
                  <h3>Unlock candidate contact for ₹199</h3>
                  <p>Pay ₹199 to reveal a candidate's direct contact details — email and phone. No platform messaging, no delays. Connect with them the same way you'd connect with a referral.</p>
                  <span className="tl-tag amber">₹199 one-time &middot; Per candidate</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className="divider" />

      <section className="matching">
        <div className="matching-inner">
          <div className="section-label">The matching engine</div>
          <h2 className="section-h2">How we calculate your match score</h2>
          <p className="section-sub">Our algorithm compares your skills against a job's requirements and produces a score from 0–100%. Only matches above 60% are shown.</p>

          <div className="algo-card">
            <div className="algo-row">
              <div className="algo-icon" style={{ background: '#e8f0fe' }}>🔍</div>
              <div className="algo-text">
                <h4>Skill intersection</h4>
                <p>We compare the skills on your profile with the skills required by the job. The more overlap, the higher your score. The formula is: skills matched ÷ total job skills × 100.</p>
              </div>
            </div>
            <div className="algo-row">
              <div className="algo-icon" style={{ background: '#e6f9f1' }}>✅</div>
              <div className="algo-text">
                <h4>60% threshold</h4>
                <p>A match is only created when your score reaches 60% or above. This keeps your list focused on roles where you're genuinely competitive — not just loosely related.</p>
              </div>
            </div>
            <div className="algo-row">
              <div className="algo-icon" style={{ background: '#fef3c7' }}>📈</div>
              <div className="algo-text">
                <h4>Ranked by fit</h4>
                <p>Your matches are sorted from highest to lowest score. A 92% match means you have nearly all the required skills — a much stronger position than a 63% match.</p>
              </div>
            </div>

            <div className="score-demo">
              <div className="score-demo-label">Example match scores</div>
              <div className="score-row">
                <div className="score-name" style={{ color: '#8896a5' }}>Senior Frontend Eng.</div>
                <div className="score-bar-wrap"><div className="score-bar" style={{ width: '92%', background: '#0ea86a' }}></div></div>
                <div className="score-pct" style={{ color: '#0ea86a' }}>92%</div>
                <div className="score-match" style={{ background: '#e6f9f1', color: '#0a7a4c' }}>Matched</div>
              </div>
              <div className="score-row">
                <div className="score-name" style={{ color: '#8896a5' }}>Full Stack Developer</div>
                <div className="score-bar-wrap"><div className="score-bar" style={{ width: '75%', background: '#1a6af4' }}></div></div>
                <div className="score-pct" style={{ color: '#5d9bfc' }}>75%</div>
                <div className="score-match" style={{ background: '#1a3a6a', color: '#5d9bfc' }}>Matched</div>
              </div>
              <div className="score-row">
                <div className="score-name" style={{ color: '#8896a5' }}>Backend Engineer</div>
                <div className="score-bar-wrap"><div className="score-bar" style={{ width: '63%', background: '#f59e0b' }}></div></div>
                <div className="score-pct" style={{ color: '#f59e0b' }}>63%</div>
                <div className="score-match" style={{ background: '#2a1f0a', color: '#f59e0b' }}>Matched</div>
              </div>
              <div className="score-row">
                <div className="score-name" style={{ color: '#8896a5' }}>ML Engineer</div>
                <div className="score-bar-wrap"><div className="score-bar" style={{ width: '40%', background: '#2d3f52' }}></div></div>
                <div className="score-pct" style={{ color: '#4a6070' }}>40%</div>
                <div className="score-match" style={{ background: '#1c2a38', color: '#4a6070' }}>Not shown</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="payment">
        <div className="section-label" style={{ color: '#f59e0b' }}>Payments</div>
        <h2 className="section-h2">How payments work</h2>
        <p className="section-sub">Both sides pay independently to unlock contact details. Neither party can see the other's information until they choose to pay.</p>
        <div className="pay-grid">
          <div className="pay-card">
            <h3>👤 Job Seekers</h3>
            <p>Pay once to unlock a recruiter's contact details. You decide which matches are worth pursuing — there's no pressure and no subscription.</p>
            <div className="pay-amount">₹99 <span>per unlock</span></div>
            <div className="pay-note">One-time &middot; Secure via Razorpay</div>
          </div>
          <div className="pay-card">
            <h3>🏢 Recruiters</h3>
            <p>Pay once per candidate you want to contact. Since you see match scores before paying, you only spend on candidates you're already confident about.</p>
            <div className="pay-amount">₹199 <span>per unlock</span></div>
            <div className="pay-note">One-time &middot; Secure via Razorpay</div>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="faq-inner">
          <div className="section-label" style={{ color: '#1a6af4' }}>FAQs</div>
          <h2 className="section-h2">Common questions</h2>

          <div className="faq-item">
            <div className="faq-q">Can the other party see my details before I pay?</div>
            <div class="faq-a">No. Your contact information is hidden until you choose to unlock a connection. The other party has to pay independently on their end to see your details too.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What if I unlock a contact but they don't respond?</div>
            <div className="faq-a">Unlocking gives you direct access to reach out — just like a warm referral. We recommend a clear, personalised message. Response rates are significantly higher than cold applications since both parties have already expressed mutual interest through the match.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Is posting a job or creating a profile really free?</div>
            <div className="faq-a">Yes — completely free. You only pay when you decide to unlock a specific contact. There are no listing fees, no monthly plans, and no hidden charges.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How do I improve my match score?</div>
            <div className="faq-a">Keep your skill profile up to date. The more accurately your skills reflect your real capabilities, the better your matches. Adding niche or in-demand skills can significantly raise your score on relevant jobs.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Are payments secure?</div>
            <div className="faq-a">Yes. All payments are processed via Razorpay, a PCI-DSS compliant payment gateway. HireBridge never stores your card details.</div>
          </div>
        </div>
      </section>

      <div className="hiw-cta-block">
        <h2>Ready to get started?</h2>
        <p>Join HireBridge as a job seeker or recruiter — it's free to sign up.</p>
        <div className="cta-btns">
          <button className="btn-cta" onClick={() => navigate('/login')}>I'm looking for a job &rarr;</button>
          <button className="btn-cta-outline" onClick={() => navigate('/login')}>I'm hiring &rarr;</button>
        </div>
        <div className="hiw-cta-note">Free to join &middot; No subscription &middot; Pay only when you connect</div>
      </div>
    </div>
  );
};

export default HowItWorks;
