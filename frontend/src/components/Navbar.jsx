import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

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
    <nav className="main-nav">
      <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <strong>Hire</strong><span className="text-blue">Bridge</span>
      </div>
      <div className="nav-links">
        <Link to="/jobs">Find Jobs</Link>
        <Link to="/for-recruiters">For Recruiters</Link>
        <Link to="/how-it-works">How it Works</Link>
        <Link to="/pricing">Pricing</Link>
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
      </div>
    </nav>
  );
};

export default Navbar;
