import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 'top -80',
      onEnter: () => navRef.current?.classList.add('scrolled'),
      onLeaveBack: () => navRef.current?.classList.remove('scrolled')
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    gsap.fromTo('.nav-logo .text-blue', 
      { x: -8, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.fromTo('.mobile-link',
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [mobileMenuOpen]);

  const handleDashboard = () => {
    if (user.role === 'seeker') navigate('/seeker');
    else if (user.role === 'recruiter') navigate('/recruiter');
    else navigate('/admin');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="main-nav" ref={navRef}>
        <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <strong>Hire</strong><span className="text-blue" style={{ display: 'inline-block' }}>Bridge</span>
        </div>
        <div className="nav-links">
          <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'active' : '')}>Find Jobs</NavLink>
          <NavLink to="/for-recruiters" className={({ isActive }) => (isActive ? 'active' : '')}>For Recruiters</NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? 'active' : '')}>How it Works</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => (isActive ? 'active' : '')}>Pricing</NavLink>
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <button className="btn-outline" onClick={handleDashboard}>Dashboard</button>
              <button className="btn-primary" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-outline" onClick={() => navigate('/login')}>Log In</button>
              <button className="btn-primary" onClick={() => navigate('/login')}>Get Started &rarr;</button>
            </>
          )}
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="mobile-links">
            <NavLink to="/jobs" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Find Jobs</NavLink>
            <NavLink to="/for-recruiters" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>For Recruiters</NavLink>
            <NavLink to="/how-it-works" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>How it Works</NavLink>
            <NavLink to="/pricing" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Pricing</NavLink>
          </div>
          <div className="mobile-actions">
            {user ? (
              <>
                <button className="btn-cta-outline" onClick={() => { setMobileMenuOpen(false); handleDashboard(); }}>Dashboard</button>
                <button className="btn-cta" onClick={() => { setMobileMenuOpen(false); handleLogout(); }}>Logout</button>
              </>
            ) : (
              <>
                <button className="btn-cta-outline" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>Log In</button>
                <button className="btn-cta" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>Get Started &rarr;</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
