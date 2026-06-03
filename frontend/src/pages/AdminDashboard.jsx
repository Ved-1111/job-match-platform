import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { LayoutDashboard, Users, Briefcase, Activity, LogOut } from 'lucide-react';

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
    <div className="portal-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem' }}>
          <h2>Hire<span style={{ color: 'var(--brand-blue)' }}>Bridge</span></h2>
        </div>

        <div className="card" style={{ marginBottom: '1rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Activity size={48} color="var(--brand-blue)" />
            <div>
              <h4 style={{ margin: 0 }}>{user?.name}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Admin</p>
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="btn-secondary" onClick={() => setActiveTab('overview')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', background: activeTab === 'overview' ? '#eff6ff' : 'transparent', color: activeTab === 'overview' ? 'var(--brand-blue)' : 'var(--ink)', justifyContent: 'flex-start' }}>
            <LayoutDashboard size={18} /> Platform Overview
          </button>
          <button className="btn-secondary" onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', justifyContent: 'flex-start', color: '#ef4444' }}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main>
        <div style={{ marginBottom: '2rem' }}>
          <h2>Platform Overview</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '12px' }}>
              <Users size={32} color="var(--brand-blue)" />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)' }}>Total Users</p>
              <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{stats?.totalUsers || 0}</h2>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '12px' }}>
              <Briefcase size={32} color="var(--brand-blue)" />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)' }}>Active Jobs</p>
              <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{stats?.totalJobs || 0}</h2>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '12px' }}>
              <Activity size={32} color="var(--match-green)" />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)' }}>Total Matches Created</p>
              <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{stats?.totalMatches || 0}</h2>
            </div>
          </div>
          
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '12px' }}>
              <Activity size={32} color="var(--unlock-amber)" />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)' }}>Platform Revenue</p>
              <h2 style={{ fontSize: '2.5rem', margin: 0 }}>₹{stats ? stats.totalMatches * 99 : 0}</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
