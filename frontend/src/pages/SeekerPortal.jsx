import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { Bell, Lock, Unlock, UserCircle, Briefcase, Settings, LogOut, CheckCircle2, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import PaymentModal from '../components/PaymentModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const TECH_SKILLS = [
  "Agile", "Angular", "Ansible", "Ant Design", "Apache", "Artificial Intelligence", "ASP.NET", "AWS", "Azure", 
  "Backbone.js", "Bash", "Bitbucket", "Blockchain", "Bootstrap", "C#", "C++", "Cassandra", "Chakra UI", "CircleCI", 
  "Computer Vision", "Confluence", "CouchDB", "Cryptography", "CSS", "Cybersecurity", "Dart", "Data Science", 
  "Deep Learning", "DigitalOcean", "Django", "Docker", "DynamoDB", "Echo", "Elasticsearch", "Elixir", "Ember.js", 
  "Ethical Hacking", "Ethereum", "Express", "FastAPI", "Figma", "Firebase", "Flask", "Gatsby", "Gin", "Git", 
  "GitHub", "GitHub Actions", "GitLab", "GitLab CI", "Go", "Google Cloud (GCP)", "GraphQL", "gRPC", "Haskell", 
  "Heroku", "HTML", "Java", "JavaScript", "Jenkins", "Jira", "Kanban", "Keras", "Kotlin", "Kubernetes", "Laravel", 
  "Less", "Linux", "Lua", "Machine Learning", "Material-UI", "Microservices", "MongoDB", "MySQL", "Natural Language Processing (NLP)", 
  "Neo4j", "NestJS", "Netlify", "Network Security", "Next.js", "Nginx", "Node.js", "NumPy", "Nuxt.js", "Pandas", 
  "Penetration Testing", "Perl", "PHP", "PostgreSQL", "PowerShell", "PyTorch", "Python", "R", "React", "Redis", 
  "REST API", "Ruby", "Ruby on Rails", "Rust", "Sass", "Scala", "Scikit-Learn", "Scrum", "Serverless", "Sketch", 
  "Smart Contracts", "Solidity", "Spring Boot", "SQLite", "Supabase", "Svelte", "Swift", "Symfony", "Tailwind CSS", 
  "TensorFlow", "Terraform", "Travis CI", "Trello", "TypeScript", "UI/UX Design", "Vercel", "Vue.js", "Web3", "WebSockets"
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MatchRing = ({ score }) => {
  return (
    <div className="match-score-badge" data-pct={score}>
      <span>{Math.round(score)}%</span>
    </div>
  );
};

const SeekerPortal = () => {
  const { token, user, logout } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, matchId: null });

  const [activeTab, setActiveTab] = useState('feed');

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '.sidebar-card',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.sidebar-card', start: 'top 90%' } }
    );

    gsap.fromTo(
      '.stat-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.stat-card', start: 'top 90%' } }
    );

    gsap.fromTo(
      '.match-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.match-card', start: 'top 90%' } }
    );
  }, [activeTab]);

  // Match score GSAP animation on mount
  useGSAP(() => {
    if (activeTab === 'feed') {
      const badges = document.querySelectorAll('.match-score-badge');
      badges.forEach(badge => {
        const pct = badge.getAttribute('data-pct');
        gsap.fromTo(badge, 
          { '--pct': 0 }, 
          { '--pct': pct, duration: 1.5, ease: 'power3.out' }
        );
      });
    }
  }, [activeTab]);

  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/profile').then(res => res.data)
  });

  const { data: matches } = useQuery({
    queryKey: ['matches'],
    queryFn: () => api.get('/matches').then(res => res.data)
  });

  const updateProfile = useMutation({
    mutationFn: (payload) => api.put('/profile', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setSelectedSkill('');
      setCustomSkill('');
      toast.success('Profile updated successfully!');
    }
  });

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      toast.error('Only PNG or JPG files are allowed');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      updateProfile.mutate({ profilePicture: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const payForMatch = useMutation({
    mutationFn: async (matchId) => {
      const orderRes = await api.post('/payments/order', { matchId, amount: 99 });
      await api.post('/payments/verify', { orderId: orderRes.data.orderId, matchId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast.success('Contact unlocked successfully!');
    }
  });

  const handleAddSkill = (e) => {
    e.preventDefault();
    const skillToAdd = selectedSkill === 'Custom' ? customSkill.trim() : selectedSkill;
    
    if (!skillToAdd) return;
    if (profile?.skills?.includes(skillToAdd)) {
      setSelectedSkill('');
      setCustomSkill('');
      return;
    }
    const combinedSkills = [...(profile?.skills || []), skillToAdd];
    updateProfile.mutate({ skills: combinedSkills });
  };

  const handleDeleteSkill = (skillToRemove) => {
    const newSkills = profile?.skills?.filter(s => s !== skillToRemove) || [];
    updateProfile.mutate({ skills: newSkills });
  };

  const [expandedContacts, setExpandedContacts] = useState({});

  const toggleContact = (matchId) => {
    setExpandedContacts(prev => ({ ...prev, [matchId]: !prev[matchId] }));
  };

  const unlockedCount = matches?.filter(m => !m.contactLocked).length || 0;

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      
      <div className="portal-layout">
        <aside className="portal-sidebar sidebar-card">
          <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: 48, height: 48 }}>
              {profile?.profilePicture ? (
                <img src={profile.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <UserCircle size={48} color="var(--brand-blue)" />
              )}
              <label style={{ position: 'absolute', bottom: -4, right: -4, background: 'var(--brand-blue)', color: 'white', borderRadius: '50%', padding: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Plus size={12} strokeWidth={3} />
                <input type="file" accept="image/png, image/jpeg" style={{ display: 'none' }} onChange={handleProfilePicUpload} />
              </label>
            </div>
            <div>
              <h4 style={{ margin: 0, fontFamily: 'DM Sans', fontWeight: 600 }}>{user?.name}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>Job Seeker</p>
            </div>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button className={`portal-nav-item ${activeTab === 'feed' ? 'active' : ''}`} onClick={() => setActiveTab('feed')}>
              <Briefcase size={20} />
              <span>Matches Feed</span>
            </button>
            <button className={`portal-nav-item ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
              <Settings size={20} />
              <span>Manage Skills</span>
            </button>
          </div>

          <button className="portal-nav-item" onClick={() => { logout(); navigate('/'); }} style={{ marginTop: 'auto', color: '#b91c1c' }}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </aside>

        <div style={{ padding: '2rem 1rem' }}>
          {activeTab === 'skills' && (
            <div className="card stat-card" style={{ maxWidth: '600px' }}>
              <h3 style={{ marginBottom: '1.5rem', fontFamily: "'DM Serif Display', serif" }}>Manage Your Skills</h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <span>Profile Completion</span>
                  <strong>{profile?.skills?.length > 0 ? '100%' : '50%'}</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px' }}>
                  <div style={{ width: profile?.skills?.length > 0 ? '100%' : '50%', height: '100%', background: 'var(--match-green)', borderRadius: '4px', transition: 'width 0.3s' }}></div>
                </div>
              </div>

              <form onSubmit={handleAddSkill}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)' }}>Select a Skill</label>
                <select 
                  value={selectedSkill}
                  onChange={e => setSelectedSkill(e.target.value)}
                  style={{ marginTop: '0.5rem', marginBottom: '0.5rem', width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer' }}
                >
                  <option value="" disabled>Choose a skill...</option>
                  {TECH_SKILLS.map(skill => (
                    <option key={skill} value={skill} disabled={profile?.skills?.includes(skill)}>
                      {skill} {profile?.skills?.includes(skill) ? '(Added)' : ''}
                    </option>
                  ))}
                  <option value="Custom">Other (Type custom skill)</option>
                </select>

                {selectedSkill === 'Custom' && (
                  <input
                    type="text"
                    placeholder="Type your custom skill..."
                    value={customSkill}
                    onChange={e => setCustomSkill(e.target.value)}
                    style={{ marginBottom: '0.5rem', width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    autoFocus
                  />
                )}

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem' }} disabled={updateProfile.isPending || !selectedSkill || (selectedSkill === 'Custom' && !customSkill.trim())}>
                  {updateProfile.isPending ? 'Adding...' : 'Add Skill'}
                </button>
              </form>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
                {profile?.skills?.map(skill => (
                  <span key={skill} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: 'var(--brand-blue)', padding: '0.35rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {skill}
                    <X size={12} style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => handleDeleteSkill(skill)} />
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feed' && (
            <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem' }}>Your Matches Feed</h2>
              <Bell color="var(--text-muted)" cursor="pointer" />
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div className="card stat-card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Total Matches</p>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', marginTop: '0.5rem' }}>{matches?.length || 0}</h3>
              </div>
              <div className="card stat-card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Unlocked</p>
                <h3 style={{ color: 'var(--match-green)', fontFamily: "'DM Serif Display', serif", fontSize: '2rem', marginTop: '0.5rem' }}>{unlockedCount}</h3>
              </div>
              <div className="card stat-card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Amount Spent</p>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', marginTop: '0.5rem' }}>₹{unlockedCount * 99}</h3>
              </div>
            </div>

            {/* Matches List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {matches?.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <Briefcase size={48} color="#e5e7eb" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: "'DM Serif Display', serif" }}>No matches yet</h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Make sure to add all your skills to get matched with top recruiters.</p>
                </div>
              )}

              {[...(matches || [])].sort((a, b) => b.matchScore - a.matchScore).map((match, idx) => {
                const isHighMatch = match.matchScore >= 80;
                return (
                  <div key={match._id} className="card match-card" style={{ marginBottom: 0, padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--brand-blue)' }}>
                          {match.jobId?.title?.charAt(0) || 'J'}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontFamily: "'DM Serif Display', serif" }}>
                            {match.jobId?.title} <span style={{ fontSize: '1rem', color: 'var(--brand-blue)', fontWeight: 'normal', fontFamily: "'DM Sans', sans-serif" }}>at {match.recruiterId?.companyName || 'Unknown Company'}</span>
                          </h3>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            {match.jobId?.location} &middot; {match.jobId?.salaryRange}
                          </p>
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                            {match.jobId?.requiredSkills?.map(s => (
                              <span key={s} style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                        <MatchRing score={match.matchScore} />

                        {match.contactLocked ? (
                          <button className="btn btn-amber" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }} onClick={() => setPaymentModal({ isOpen: true, matchId: match._id })} disabled={payForMatch.isPending}>
                            <Lock size={16} /> Unlock ₹99
                          </button>
                        ) : (
                          <button onClick={() => toggleContact(match._id)} className="btn btn-green" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                            <CheckCircle2 size={16} /> {expandedContacts[match._id] ? 'Hide Contact' : 'View Contact'}
                          </button>
                        )}
                      </div>
                    </div>

                    {!match.contactLocked && expandedContacts[match._id] && (
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Recruiter Name</p>
                          <p style={{ fontWeight: 500, fontSize: '1.1rem' }}>{match.recruiterId?.name}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Email</p>
                          <p style={{ fontWeight: 500, fontSize: '1.1rem' }}>{match.recruiterId?.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            </>
          )}
        </div>
      </div>
      
      <PaymentModal 
        isOpen={paymentModal.isOpen} 
        onClose={() => setPaymentModal({ isOpen: false, matchId: null })}
        onConfirm={() => {
          if (paymentModal.matchId) {
            payForMatch.mutate(paymentModal.matchId);
          }
        }}
        amount={99}
      />
    </div>
  );
};

export default SeekerPortal;
