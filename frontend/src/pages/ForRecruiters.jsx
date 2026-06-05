import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Lock, Zap, DollarSign } from 'lucide-react';
import Navbar from '../components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ForRecruiters.css';

const ForRecruiters = () => {
  const navigate = useNavigate();
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

    // Global Reveal
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
            onEnter: () => section.classList.add('is-revealed'),
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Hero Parallax
    gsap.to('.hero-bg-layer', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.recruiter-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Benefit Grid Stagger
    gsap.fromTo(
      '.benefit-card',
      { opacity: 0, y: 48, rotateX: 4 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.benefit-grid', start: 'top 82%' }
      }
    );
  }, []);

  return (
    <div className="recruiter-wrap">
      <Navbar />

      <div className="recruiter-hero">
        <div className="hero-bg-layer"></div>
        <div className="hero-grid-overlay"></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="recruiter-eyebrow">For Recruiters</div>
          <h1 ref={heroRef}>
            <span className="word">Get </span>
            <span className="word">matched </span>
            <span className="word">to </span>
            <span className="word">candidates </span>
            <span className="word">that </span>
            <em className="hero-em">fit your role</em>
          </h1>
          <p>HireBridge connects your open roles directly with active job seekers — no spam, no waiting, no noise.</p>
          <button className="btn-cta" onClick={() => navigate('/login')}>Post your first job &rarr;</button>
        </div>
      </div>

      <section className="steps reveal">
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
            <h3>Unlock and connect for ₹199</h3>
            <p>When a match looks right, pay a one-time ₹199 fee to reveal the candidate's contact details. No subscriptions, no recruiting agencies — just a direct line to the right person.</p>
          </div>
        </div>
      </section>

      <section className="benefits reveal">
        <div className="benefits-inner">
          <div className="benefits-label">Why HireBridge</div>
          <h2>Built differently, for your benefit</h2>
          <div className="benefit-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><Target size={32} color="#1a56db" /></div>
              <h4>Only relevant candidates</h4>
              <p>You only see candidates whose skills already match. No screening through hundreds of unqualified resumes.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><Lock size={32} color="#1a56db" /></div>
              <h4>Candidate privacy respected</h4>
              <p>You can't see their contact info until you choose to unlock the connection, ensuring high-quality, intent-driven outreach.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><Zap size={32} color="#1a56db" /></div>
              <h4>Skip the sourcing stage</h4>
              <p>Matched candidates are already interested in your role profile. You skip the cold-outreach stage entirely.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><DollarSign size={32} color="#1a56db" /></div>
              <h4>Pay only when it counts</h4>
              <p>Posting a job is free. You only pay ₹199 when you decide a specific matched candidate is worth interviewing.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-block reveal">
        <h2>Ready to make your next hire?</h2>
        <p>Be among the first companies finding top talent on HireBridge.</p>
        <button className="btn-cta" onClick={() => navigate('/login')}>Log in to get started &rarr;</button>
        <div className="cta-note">Free to post &middot; No subscription &middot; Pay only when you connect</div>
      </div>
    </div>
  );
};

export default ForRecruiters;
