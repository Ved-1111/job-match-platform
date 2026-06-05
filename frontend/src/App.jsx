import React, { useEffect, useRef } from 'react';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useAuthStore();
  if (!token) return <Navigate to="/" replace />;
  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Page transition wrapper — fade in/out on route change
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// Scroll progress bar (GSAP scrub)
const ScrollProgress = () => {
  const barRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Kill previous trigger on route change so progress resets
    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${self.progress})`;
        }
      }
    });

    return () => trigger.kill();
  }, [location.pathname]);

  return <div className="scroll-progress" ref={barRef} />;
};

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Animated routes — must be inside BrowserRouter to use useLocation
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />

          {/* Public Pages */}
          <Route path="/jobs" element={<PageTransition><FindJobs /></PageTransition>} />
          <Route path="/for-recruiters" element={<PageTransition><ForRecruiters /></PageTransition>} />
          <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />

          {/* Protected Pages — no fade transition needed, portals are full-page apps */}
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
      </AnimatePresence>
    </>
  );
};

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "799535285735-0i1hnsr9gphl510fqd6vieprq40f0fc9.apps.googleusercontent.com"}>
      <BrowserRouter>
        <Toaster position="top-center" />
        <AnimatedRoutes />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

