import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { Building, Lock, CheckCircle2, PlusCircle, Users, LogOut, Bell, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import PaymentModal from '../components/PaymentModal';

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

const TECH_JOB_TITLES = [
  "AI Researcher", "Android Developer", "Backend Developer", "Blockchain Developer", "Business Analyst", 
  "Cloud Architect", "Cybersecurity Analyst", "Data Analyst", "Data Engineer", "Data Scientist", 
  "Database Administrator", "DevOps Engineer", "Engineering Manager", "Frontend Developer", "Full Stack Developer", 
  "Game Developer", "iOS Developer", "IT Support Specialist", "Lead Developer", "Machine Learning Engineer", 
  "Mobile App Developer", "Network Engineer", "Product Designer", "Product Manager", "Project Manager", 
  "QA Engineer", "Scrum Master", "Security Engineer", "Senior Software Engineer", "Site Reliability Engineer (SRE)", 
  "Smart Contract Engineer", "Software Engineer", "Software Tester", "Solutions Architect", "Systems Administrator", 
  "Technical Lead", "UI/UX Designer"
];

const API_URL = 'http://localhost:5000/api';

const RecruiterPortal = () => {
  const { token, user, logout } = useAuthStore();
  const queryClient = useQueryClient();
  
  const [jobForm, setJobForm] = useState({ title: '', requiredSkills: [], salaryRange: '', location: '', jobType: 'Full-time' });
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, matchId: null });

  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });

  const { data: myJobs } = useQuery({
    queryKey: ['myJobs'],
    queryFn: () => api.get('/jobs').then(res => res.data)
  });

  const { data: matches } = useQuery({
    queryKey: ['recruiterMatches'],
    queryFn: () => api.get('/matches').then(res => res.data)
  });

  const createJob = useMutation({
    mutationFn: (newJob) => api.post('/jobs', { 
      ...newJob, 
      requiredSkills: newJob.requiredSkills 
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myJobs'] });
      setJobForm({ title: '', requiredSkills: [], salaryRange: '', location: '', jobType: 'Full-time' });
      setCustomJobTitle('');
      setShowPostForm(false);
    }
  });

  const handleAddSkillToJob = (e) => {
    e.preventDefault();
    const skillToAdd = selectedSkill === 'Custom' ? customSkill.trim() : selectedSkill;
    
    if (!skillToAdd) return;
    if (jobForm.requiredSkills.includes(skillToAdd)) {
      setSelectedSkill('');
      setCustomSkill('');
      return;
    }
    setJobForm({ ...jobForm, requiredSkills: [...jobForm.requiredSkills, skillToAdd] });
    setSelectedSkill('');
    setCustomSkill('');
  };

  const handleRemoveSkillFromJob = (skillToRemove) => {
    setJobForm({ ...jobForm, requiredSkills: jobForm.requiredSkills.filter(s => s !== skillToRemove) });
  };

  const deleteJob = useMutation({
    mutationFn: (jobId) => api.delete(`/jobs/${jobId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myJobs'] });
      // Invalidate matches too, since deleting a job should theoretically clean up its matches
      queryClient.invalidateQueries({ queryKey: ['recruiterMatches'] });
    }
  });

  const payForMatch = useMutation({
    mutationFn: async (matchId) => {
      const orderRes = await api.post('/payments/order', { matchId, amount: 99 });
      await api.post('/payments/verify', { orderId: orderRes.data.orderId, matchId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruiterMatches'] });
    }
  });

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (jobForm.requiredSkills.length === 0) {
      alert("Please add at least one required skill.");
      return;
    }
    
    const finalTitle = jobForm.title === 'Custom' ? customJobTitle.trim() : jobForm.title;
    if (!finalTitle) {
      alert("Please provide a job title.");
      return;
    }
    
    createJob.mutate({ ...jobForm, title: finalTitle });
  };

  const [expandedContacts, setExpandedContacts] = useState({});

  const toggleContact = (matchId) => {
    setExpandedContacts(prev => ({ ...prev, [matchId]: !prev[matchId] }));
  };

  const unlockedCount = matches?.filter(m => !m.contactLocked).length || 0;

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ marginBottom: '1rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Building size={48} color="var(--brand-blue)" />
                <div>
                  <h4 style={{ margin: 0 }}>{user?.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Recruiter</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setShowPostForm(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', border: 'none', background: !showPostForm ? '#eff6ff' : '#fff', color: !showPostForm ? 'var(--brand-blue)' : 'var(--ink)', justifyContent: 'flex-start', borderRadius: '8px', fontWeight: 500, boxShadow: !showPostForm ? '0 0 0 1px var(--brand-blue)' : '0 1px 3px rgba(0,0,0,0.05)' }}>
                <Users size={20} /> Dashboard Home
              </button>
              <button className="btn-secondary" onClick={() => setShowPostForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', border: 'none', background: showPostForm ? '#eff6ff' : '#fff', color: showPostForm ? 'var(--brand-blue)' : 'var(--ink)', justifyContent: 'flex-start', borderRadius: '8px', fontWeight: 500, boxShadow: showPostForm ? '0 0 0 1px var(--brand-blue)' : '0 1px 3px rgba(0,0,0,0.05)' }}>
                <PlusCircle size={20} /> Post a New Job
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem' }}>{showPostForm ? 'Post a New Job' : 'Candidate Matches'}</h2>
              <Bell color="var(--text-muted)" cursor="pointer" />
            </div>

            {!showPostForm && (
              <>
                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                  <div className="card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Active Jobs</p>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', marginTop: '0.5rem' }}>{myJobs?.length || 0}</h3>
                  </div>
                  <div className="card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Unlocked Applicants</p>
                    <h3 style={{ color: 'var(--match-green)', fontFamily: "'DM Serif Display', serif", fontSize: '2rem', marginTop: '0.5rem' }}>{unlockedCount}</h3>
                  </div>
                  <div className="card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Total Spend</p>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', marginTop: '0.5rem' }}>₹{unlockedCount * 99}</h3>
                  </div>
                </div>

                {/* Active Jobs Feed */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building size={20} color="var(--brand-blue)" /> Your Active Jobs
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {myJobs?.length === 0 ? (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>You haven't posted any jobs yet.</div>
                    ) : (
                      myJobs?.map(job => (
                        <div key={job._id} className="card" style={{ padding: '1.25rem', marginBottom: 0, position: 'relative' }}>
                          <button 
                            onClick={() => deleteJob.mutate(job._id)}
                            disabled={deleteJob.isPending}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0.7 }}
                            title="Delete Job"
                          >
                            <Trash2 size={18} />
                          </button>
                          <h4 style={{ marginBottom: '0.25rem', fontSize: '1.1rem', paddingRight: '2rem' }}>{job.title}</h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                            {job.location} &middot; {job.salaryRange}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {job.requiredSkills?.map(s => (
                              <span key={s} style={{ background: '#f3f4f6', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Matches Feed */}
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={20} color="var(--brand-blue)" /> Candidate Matches
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {matches?.length === 0 && (
                    <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                      <Users size={48} color="#e5e7eb" style={{ margin: '0 auto 1rem' }} />
                      <h3>No candidates yet</h3>
                      <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Make sure your job postings have accurate required skills.</p>
                    </div>
                  )}

                  {matches?.sort((a, b) => b.matchScore - a.matchScore).map(match => {
                    const isHighMatch = match.matchScore >= 80;
                    return (
                      <div key={match._id} className="card" style={{ marginBottom: 0, padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--brand-blue)' }}>
                              {match.seekerId?.name ? match.seekerId.name.charAt(0) : '?'}
                            </div>
                            <div>
                              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontFamily: "'DM Serif Display', serif" }}>
                                {match.contactLocked ? 'Anonymous Candidate' : match.seekerId?.name}
                              </h3>
                              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                Applying for: <strong>{match.jobId?.title}</strong>
                              </p>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                            <div style={{ 
                              background: isHighMatch ? '#dcfce7' : '#fef3c7', 
                              color: isHighMatch ? 'var(--match-green)' : '#b45309',
                              padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600
                            }}>
                              {Math.round(match.matchScore)}% match
                            </div>

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
                          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Email</p>
                              <p style={{ fontWeight: 500, fontSize: '1.1rem' }}>{match.seekerId?.email}</p>
                            </div>
                            <div>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Matched Skills</p>
                              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                                {match.seekerId?.skills?.map(s => (
                                  <span key={s} style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  </div>
                </div>
              </>
            )}

            {showPostForm && (
              <div className="card">
                <form onSubmit={handleCreateJob}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Job Title</label>
                      <select 
                        value={jobForm.title}
                        onChange={e => setJobForm({...jobForm, title: e.target.value})}
                        style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', background: '#fff', cursor: 'pointer' }}
                        required
                      >
                        <option value="" disabled>Choose a job title...</option>
                        {TECH_JOB_TITLES.map(title => (
                          <option key={title} value={title}>{title}</option>
                        ))}
                        <option value="Custom">Other (Type custom title)</option>
                      </select>

                      {jobForm.title === 'Custom' && (
                        <input
                          type="text"
                          placeholder="Type custom job title..."
                          value={customJobTitle}
                          onChange={e => setCustomJobTitle(e.target.value)}
                          style={{ marginTop: '0.5rem', width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                          required
                          autoFocus
                        />
                      )}
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Required Skills</label>
                      
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'flex-start' }}>
                        <select 
                          value={selectedSkill}
                          onChange={e => setSelectedSkill(e.target.value)}
                          style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', flex: 1 }}
                        >
                          <option value="" disabled>Choose a skill...</option>
                          {TECH_SKILLS.map(skill => (
                            <option key={skill} value={skill} disabled={jobForm.requiredSkills.includes(skill)}>
                              {skill} {jobForm.requiredSkills.includes(skill) ? '(Added)' : ''}
                            </option>
                          ))}
                          <option value="Custom">Other (Type custom skill)</option>
                        </select>
                        <button onClick={handleAddSkillToJob} type="button" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px' }} disabled={!selectedSkill || (selectedSkill === 'Custom' && !customSkill.trim())}>
                          Add
                        </button>
                      </div>

                      {selectedSkill === 'Custom' && (
                        <input
                          type="text"
                          placeholder="Type custom skill..."
                          value={customSkill}
                          onChange={e => setCustomSkill(e.target.value)}
                          style={{ marginTop: '0.5rem', width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                          autoFocus
                        />
                      )}

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                        {jobForm.requiredSkills.map(skill => (
                          <span key={skill} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: 'var(--brand-blue)', padding: '0.35rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>
                            {skill}
                            <Trash2 size={12} style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => handleRemoveSkillFromJob(skill)} />
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Salary Range</label>
                      <input type="text" placeholder="e.g. ₹20-30 LPA" required value={jobForm.salaryRange} onChange={e => setJobForm({...jobForm, salaryRange: e.target.value})} style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Location</label>
                      <input type="text" placeholder="e.g. Remote, Bengaluru" required value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}/>
                    </div>
                  </div>
                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" className="btn-secondary btn" onClick={() => setShowPostForm(false)}>Cancel</button>
                    <button type="submit" className="btn-primary" disabled={createJob.isPending}>{createJob.isPending ? 'Publishing...' : 'Publish Job'}</button>
                  </div>
                </form>
              </div>
            )}
          </div>
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

export default RecruiterPortal;
