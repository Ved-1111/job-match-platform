import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Lock, Zap, DollarSign } from 'lucide-react';
import Navbar from '../components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './FindJobs.css';

const FindJobs = () => {
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
        trigger: '.find-jobs-hero',
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
    <div className="find-jobs-wrap">
      <Navbar />

      <div className="find-jobs-hero">
        <div className="hero-bg-layer"></div>
        <div className="hero-grid-overlay"></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-eyebrow-find">For Job Seekers</div>
          <h1 ref={heroRef}>
            <span className="word">Get </span>
            <span className="word">matched </span>
            <span className="word">to </span>
            <span className="word">jobs </span>
            <span className="word">that </span>
            <em className="hero-em">fit you</em>
          </h1>
          <p>HireBridge connects your skills directly with recruiters who are actively hiring — no applications, no waiting, no noise.</p>
          <button className="btn-cta" onClick={() => navigate('/login')}>Create your free profile &rarr;</button>
        </div>
      </div>

      <section className="steps reveal">
        <div className="steps-label">How it works</div>
        <h2>Three steps to your next role</h2>

        <div className="step">
          <div className="step-num">1</div>
          <div className="step-body">
            <h3>Build your skill profile</h3>
            <p>Add your skills, experience level, and the kind of role you're looking for. No lengthy resume uploads — just the details that matter to recruiters.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-num">2</div>
          <div className="step-body">
            <h3>Get matched automatically</h3>
            <p>Our algorithm scores your profile against every active job posting. When your skills hit 60% or more of a job's requirements, a match is created — instantly.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-num">3</div>
          <div className="step-body">
            <h3>Unlock and connect for ₹99</h3>
            <p>When a match looks right, pay a one-time ₹99 fee to reveal the recruiter's contact details. No subscriptions, no spam — just a direct line to the right person.</p>
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
              <h4>Only relevant opportunities</h4>
              <p>You only see jobs where your skills already match. No scrolling through hundreds of listings that don't fit.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><Lock size={32} color="#1a56db" /></div>
              <h4>Your data stays private</h4>
              <p>Recruiters can't see your contact info until you choose to unlock the connection. You're always in control.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><Zap size={32} color="#1a56db" /></div>
              <h4>Skip the application queue</h4>
              <p>Matched recruiters are already interested in your profile. You skip the cold-application stage entirely.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><DollarSign size={32} color="#1a56db" /></div>
              <h4>Pay only when it counts</h4>
              <p>Creating a profile is free. You only pay ₹99 when you decide a specific match is worth pursuing.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-block reveal">
        <h2>Ready to find your next job?</h2>
        <p>Be among the first professionals getting matched on HireBridge.</p>
        <button className="btn-cta" onClick={() => navigate('/login')}>Log in to get started &rarr;</button>
        <div className="cta-note">Free to join &middot; No subscription &middot; Pay only when you connect</div>
      </div>
    </div>
  );
};

export default FindJobs;
