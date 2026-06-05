import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Search, DollarSign, Clock, ShieldCheck, Users, User, Building2, Check, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const statRefs = React.useRef([]);
  const heroRef = React.useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Headline Animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.word'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo('.hero-em',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.4)', delay: 0.55 }
      );
    }

    // 1. Global Reveal for sections
    gsap.utils.toArray('.reveal').forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 2. Hero Parallax
    gsap.to('.hero-bg-layer', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.home-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // 3. Card Grid Staggers
    const grids = [
      { trigger: '.problem-grid', target: '.problem-card' },
      { trigger: '.for-grid', target: '.for-card' },
      { trigger: '.test-grid', target: '.test-card' },
    ];
    grids.forEach(({ trigger, target }) => {
      gsap.fromTo(
        target,
        { opacity: 0, y: 48, rotateX: 4 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: trigger, start: 'top 82%' }
        }
      );
    });

    // 4. Stat Counter Animation
    gsap.fromTo('.home-stat',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.9, ease: 'power2.out', once: true }
    );

    const targets = [10000, 1000, 90, 99];
    if (statRefs.current.length > 0) {
      statRefs.current.forEach((el, index) => {
        let maxVal = targets[index];
        let obj = { val: 0 };
        gsap.to(
          obj,
          {
            val: maxVal,
            duration: 1.6,
            delay: 0.9 + (index * 0.15),
            ease: 'power1.out',
            onUpdate: function () {
              if (!el) return;
              const currentVal = Math.floor(obj.val);
              if (index === 0) el.innerHTML = `Goal: ${Math.floor(currentVal / 1000) === 10 ? 10 : (currentVal / 1000).toFixed(1)}<span>k</span>`;
              else if (index === 1) el.innerHTML = `Goal: ${Math.floor(currentVal / 1000) === 1 ? 1 : (currentVal / 1000).toFixed(1)}<span>k</span>`;
              else if (index === 2) el.innerHTML = `${currentVal}<span>%</span>`;
              else el.innerHTML = `₹${currentVal}`;
            },
            once: true
          }
        );
      });
    }

    // 5. Horizontal Pin Table
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const rows = gsap.utils.toArray('.vs-table tbody tr');
      gsap.fromTo(rows,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: '.vs-table-wrap',
            start: 'top 40%',
            pin: '.vs-pin-container',
            scrub: true,
            end: '+=400'
          }
        }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo('.vs-table tbody tr',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, scrollTrigger: { trigger: '.vs-table-wrap', start: 'top 85%' } }
      );
    });
  }, []);

  return (
    <div className="home-wrap">
      <Navbar />

      {/* Hero */}
      <div className="home-hero">
        <div className="hero-bg-layer"></div>
        <div className="hero-grid-overlay"></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="home-hero-eyebrow">Skill-based job matching</div>
          <h1 ref={heroRef}>
            <span className="word">The </span>
            <span className="word">bridge </span>
            <span className="word">between </span>
            <em className="hero-em">talent</em>
            <span className="word"> and </span>
            <span className="word">opportunity</span>
          </h1>
          <p>HireBridge matches job seekers to recruiters by skills — not resumes. Connect directly, pay only when it counts.</p>
          <div className="home-hero-btns">
            <button className="btn-cta" onClick={() => navigate('/login')}>Find matching jobs &rarr;</button>
            <button className="btn-cta-outline" onClick={() => navigate('/login')}>I'm hiring talent</button>
          </div>
          <div className="home-stats">
            <div className="home-stat"><div className="stat-num" ref={el => statRefs.current[0] = el}>Goal: 0<span>k</span></div><div className="stat-label">Active seekers</div></div>
            <div className="home-stat"><div className="stat-num" ref={el => statRefs.current[1] = el}>Goal: 0<span>k</span></div><div className="stat-label">Jobs posted</div></div>
            <div className="home-stat"><div className="stat-num" ref={el => statRefs.current[2] = el}>0<span>%</span></div><div className="stat-label">Target match accuracy</div></div>
            <div className="home-stat"><div className="stat-num" ref={el => statRefs.current[3] = el}>₹0</div><div className="stat-label">To unlock a contact</div></div>
          </div>
        </div>
      </div>

      {/* Problems we solve */}
      <section className="problems reveal">
        <div className="section-eyebrow">Why HireBridge exists</div>
        <h2 className="section-h2">Hiring is broken. We fixed it.</h2>
        <p className="section-sub">The same frustrations, on both sides. HireBridge was built to solve all of them.</p>
        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon"><Mail size={32} color="#1a56db" /></div>
            <div className="problem-old">Applying into the void</div>
            <div className="problem-new">Get matched, not ignored</div>
            <p>Recruiters only see candidates who already fit their requirements — your profile reaches them automatically.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon"><Search size={32} color="#1a56db" /></div>
            <div className="problem-old">Keyword-filtered out</div>
            <div className="problem-new">Skill-scored, not filtered</div>
            <p>We compare your actual skills against job requirements, not buzzwords. A 75% match beats a keyword mismatch every time.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon"><DollarSign size={32} color="#1a56db" /></div>
            <div className="problem-old">Expensive subscriptions</div>
            <div className="problem-new">Pay only when you connect</div>
            <p>No monthly fees, no listing charges. ₹99 for seekers, ₹199 for recruiters — only when you decide to reach out.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon"><Clock size={32} color="#1a56db" /></div>
            <div className="problem-old">Weeks of waiting</div>
            <div className="problem-new">Matches in minutes</div>
            <p>As soon as your profile or job goes live, our algorithm runs instantly. No waiting for applications to trickle in.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon"><ShieldCheck size={32} color="#1a56db" /></div>
            <div className="problem-old">Gatekeepers everywhere</div>
            <div className="problem-new">Direct contact, always</div>
            <p>When you unlock a connection, you get their real email and phone number — no platform DMs, no middlemen.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon"><Users size={32} color="#1a56db" /></div>
            <div className="problem-old">Spray-and-pray hiring</div>
            <div className="problem-new">Only serious connections</div>
            <p>Because both parties pay a small fee to connect, every unlock represents genuine interest — not mass outreach.</p>
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="for-who reveal">
        <div className="for-who-inner">
          <div className="section-eyebrow">Who it's for</div>
          <h2 className="section-h2">Built for both sides</h2>
          <p className="section-sub">Whether you're looking for work or looking to hire, HireBridge removes the friction from both ends.</p>
          <div className="for-grid">
            <div className="for-card seeker">
              <div className="for-icon"><User size={40} color="#1a56db" /></div>
              <h3>Job Seekers</h3>
              <p>Skip the application queue. Get matched to roles where your skills already fit and reach recruiters directly.</p>
              <ul className="for-features">
                <li><span className="yes"><Check size={16} /></span> Free profile & automatic matching</li>
                <li><span className="yes"><Check size={16} /></span> Browse all matches for free</li>
                <li><span className="yes"><Check size={16} /></span> Unlock recruiter contact for ₹99</li>
                <li><span className="yes"><Check size={16} /></span> No subscriptions, ever</li>
              </ul>
              <button className="for-btn" onClick={() => navigate('/login')}>Create free profile &rarr;</button>
            </div>
            <div className="for-card recruiter">
              <div className="for-icon"><Building2 size={40} color="#1a56db" /></div>
              <h3>Recruiters</h3>
              <p>Post your requirements and get a ranked list of pre-qualified candidates — without waiting for a single application.</p>
              <ul className="for-features">
                <li><span className="yes"><Check size={16} /></span> Free job posting, live instantly</li>
                <li><span className="yes"><Check size={16} /></span> See match scores before paying</li>
                <li><span className="yes"><Check size={16} /></span> Unlock candidate contact for ₹199</li>
                <li><span className="yes"><Check size={16} /></span> No listing fees or monthly plans</li>
              </ul>
              <button className="for-btn" onClick={() => navigate('/login')}>Post your first job &rarr;</button>
            </div>
          </div>
        </div>
      </section>

      {/* HireBridge vs Traditional */}
      <section className="vs vs-pin-container reveal">
        <div className="section-eyebrow">The difference</div>
        <h2 className="section-h2">HireBridge vs traditional job boards</h2>
        <p className="section-sub">See exactly what makes us different from the platforms you've used before.</p>
        <div className="vs-table-wrap" style={{ overflow: 'hidden' }}>
          <table className="vs-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th><span className="col-hb">HireBridge</span></th>
                <th><span className="col-old">Traditional boards</span></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Automatic skill-based matching</td><td><span className="yes"><Check size={20} /></span></td><td><span className="no"><X size={20} /></span></td></tr>
              <tr><td>Massive volume of candidates</td><td><span className="no"><X size={20} /></span></td><td><span className="yes"><Check size={20} /></span></td></tr>
              <tr><td>See match score before paying</td><td><span className="yes"><Check size={20} /></span></td><td><span className="no"><X size={20} /></span></td></tr>
              <tr><td>Familiar search filters</td><td><span className="no"><X size={20} /></span></td><td><span className="yes"><Check size={20} /></span></td></tr>
              <tr><td>No monthly subscription required</td><td><span className="yes"><Check size={20} /></span></td><td><span className="no"><X size={20} /></span></td></tr>
              <tr><td>Both sides verify genuine interest</td><td><span className="yes"><Check size={20} /></span></td><td><span className="no"><X size={20} /></span></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials reveal">
        <div className="testimonials-inner">
          <div className="section-eyebrow">Beta user feedback</div>
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
      <section className="trust reveal">
        <div className="trust-label">Talent from companies like</div>
        <div className="trust-logos">
          <div className="trust-logo">Zepto</div>
          <div className="trust-logo">Razorpay</div>
          <div className="trust-logo">Groww</div>
          <div className="trust-logo">Meesho</div>
          <div className="trust-logo">CRED</div>
          <div className="trust-logo">Swiggy</div>
          {/* Duplicate for infinite loop */}
          <div className="trust-logo" aria-hidden="true">Zepto</div>
          <div className="trust-logo" aria-hidden="true">Razorpay</div>
          <div className="trust-logo" aria-hidden="true">Groww</div>
          <div className="trust-logo" aria-hidden="true">Meesho</div>
          <div className="trust-logo" aria-hidden="true">CRED</div>
          <div className="trust-logo" aria-hidden="true">Swiggy</div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="home-cta-block reveal">
        <h2>Your next opportunity is <em>already waiting</em></h2>
        <p>Be among the first professionals and recruiters connecting on HireBridge.</p>
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
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <a href="https://twitter.com/hirebridge" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com/company/hirebridge" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="footer-copy">&copy; 2025 HireBridge</div>
      </footer>
    </div>
  );
};

export default Home;
