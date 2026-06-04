import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';
import Navbar from '../components/Navbar';

// Note: For local dev, hardcoding backend URL. Use env vars in prod.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'seeker', companyName: '' });
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        await axios.post(`${API_URL}/auth/register`, formData);
        alert('Registration successful! Please login.');
        setIsRegistering(false);
      } else {
        const res = await axios.post(`${API_URL}/auth/login`, { email: formData.email, password: formData.password });
        login(res.data.user, res.data.token);
        
        // Redirect based on role
        if (res.data.user.role === 'seeker') navigate('/seeker');
        if (res.data.user.role === 'recruiter') navigate('/recruiter');
        if (res.data.user.role === 'admin') navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'An error occurred');
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement actual Google OAuth here
    alert("To make this work, you'll need to set up a Google Cloud Project, get an OAuth Client ID, and install @react-oauth/google. Want me to help you set that up?");
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', margin: 0, fontFamily: "'DM Serif Display', serif" }}>
            Hire<span style={{ color: 'var(--brand-blue)' }}>Bridge</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to continue to your dashboard</p>
        </div>

      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }} data-aos="fade-up">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--ink)' }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--ink)' }}>Account Type</label>
                <select 
                  value={formData.role} 
                  onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="seeker">Job Seeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>
              {formData.role === 'recruiter' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--ink)' }}>Company Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Google, Inc." 
                    value={formData.companyName}
                    onChange={e => setFormData({...formData, companyName: e.target.value})}
                    required 
                  />
                </div>
              )}
            </>
          )}
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--ink)' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--ink)' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1.5rem', padding: '0.875rem' }}>
            {isRegistering ? 'Register' : 'Log In with Email'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
          <div style={{ padding: '0 10px', color: '#6b7280', fontSize: '0.875rem' }}>OR</div>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
        </div>

        <button type="button" onClick={handleGoogleLogin} style={{ width: '100%', padding: '0.875rem', background: '#fff', border: '1px solid #d1d5db', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', borderRadius: '99px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', transition: 'background 0.2s' }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {isRegistering ? "Already have an account? " : "Don't have an account? "}
          <span 
            style={{ color: 'var(--brand-blue)', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Log in here' : 'Sign up here'}
          </span>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
