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
          
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}>
            {isRegistering ? 'Register' : 'Log In'}
          </button>
        </form>
        
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
