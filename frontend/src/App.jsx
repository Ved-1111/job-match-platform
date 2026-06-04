import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAuthStore from './store/useAuthStore';
import Home from './pages/Home';
import Login from './pages/Login';
import SeekerPortal from './pages/SeekerPortal';
import RecruiterPortal from './pages/RecruiterPortal';
import AdminDashboard from './pages/AdminDashboard';
import PlaceholderPage from './pages/PlaceholderPage';

import FindJobs from './pages/FindJobs';

import ForRecruiters from './pages/ForRecruiters';

import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useAuthStore();
  
  if (!token) return <Navigate to="/" replace />;
  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="container">
      {children}
    </div>
  );
};

function App() {
  const { token } = useAuthStore();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Public Pages */}
        <Route path="/jobs" element={<FindJobs />} />
        <Route path="/for-recruiters" element={<ForRecruiters />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        
        <Route path="/seeker" element={
          <ProtectedRoute allowedRoles={['seeker']}>
            <SeekerPortal />
          </ProtectedRoute>
        } />
        
        <Route path="/recruiter" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterPortal />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
