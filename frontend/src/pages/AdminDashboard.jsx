import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { LayoutDashboard, Users, Briefcase, Activity, LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const { token, user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });

  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => api.get('/admin/stats').then(res => res.data)
  });

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <div className="portal-layout">
        <aside className="portal-sidebar sidebar-card">
          <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Activity size={48} color="var(--brand-blue)" />
            <div>
              <h4 style={{ margin: 0, fontFamily: 'DM Sans', fontWeight: 600 }}>{user?.name}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>Admin</p>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button className={`portal-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <LayoutDashboard size={20} />
              <span>Platform Overview</span>
            </button>
          </div>

          <button className="portal-nav-item" onClick={logout} style={{ marginTop: 'auto', color: '#b91c1c' }}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </aside>

        <div style={{ padding: '2rem 1rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem' }}>Platform Overview</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 0 }}>
              <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '12px' }}>
                <Users size={32} color="var(--brand-blue)" />
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Total Users</p>
                <h2 style={{ fontSize: '2.5rem', margin: 0, fontFamily: "'DM Serif Display', serif" }}>{stats?.totalUsers || 0}</h2>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 0 }}>
              <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '12px' }}>
                <Briefcase size={32} color="var(--brand-blue)" />
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Active Jobs</p>
                <h2 style={{ fontSize: '2.5rem', margin: 0, fontFamily: "'DM Serif Display', serif" }}>{stats?.totalJobs || 0}</h2>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 0 }}>
              <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '12px' }}>
                <Activity size={32} color="var(--match-green)" />
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Total Matches Created</p>
                <h2 style={{ fontSize: '2.5rem', margin: 0, fontFamily: "'DM Serif Display', serif" }}>{stats?.totalMatches || 0}</h2>
              </div>
            </div>
            
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 0 }}>
              <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '12px' }}>
                <Activity size={32} color="var(--unlock-amber)" />
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Platform Revenue</p>
                <h2 style={{ fontSize: '2.5rem', margin: 0, fontFamily: "'DM Serif Display', serif" }}>₹{stats ? stats.totalMatches * 99 : 0}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
