import React, { useState } from 'react';
import { CreditCard, X, Loader2, CheckCircle2, Lock } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onConfirm, amount }) => {
  const [status, setStatus] = useState('idle'); // idle, processing, success

  if (!isOpen) return null;

  const handlePay = () => {
    setStatus('processing');
    // Simulate network request for payment gateway
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onConfirm(); // Trigger actual API call to unlock
        onClose();
      }, 1200);
    }, 1500);
  };

  const handleClose = () => {
    if (status !== 'processing') {
      setStatus('idle');
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 25, 35, 0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, backdropFilter: 'blur(4px)'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem 2rem', position: 'relative', margin: '0 1rem', background: '#fff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
        <button onClick={handleClose} disabled={status === 'processing'} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={20} />
        </button>

        {status === 'idle' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#eff6ff', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--brand-blue)' }}>
              <CreditCard size={32} />
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>Secure Checkout</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
              Complete your payment to unlock this contact instantly.
            </p>
            
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
              <span style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '1.1rem' }}>Total Amount</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>₹{amount}</span>
            </div>

            <button onClick={handlePay} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', borderRadius: '12px' }}>
              Pay Securely
            </button>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
              <Lock size={12} /> Secured by Razorpay
            </p>
          </div>
        )}

        {status === 'processing' && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <Loader2 size={64} color="var(--brand-blue)" style={{ margin: '0 auto 1.5rem', animation: 'spin 1.5s linear infinite' }} />
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', color: 'var(--ink)' }}>Processing...</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Please wait while we verify your payment.</p>
          </div>
        )}

        {status === 'success' && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle2 size={80} color="var(--match-green)" style={{ margin: '0 auto 1.5rem' }} />
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', color: 'var(--match-green)' }}>Payment Successful!</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Contact has been unlocked.</p>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PaymentModal;
