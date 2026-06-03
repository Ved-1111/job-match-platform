const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { Payment, Match, Notification } = require('../index');

// Create a payment order (e.g. via Razorpay/Stripe API)
router.post('/order', protect, async (req, res) => {
  try {
    const { matchId, amount } = req.body;
    
    // In a real app: Call Stripe/Razorpay API here to create an order
    const mockOrderId = 'ORDER_' + Math.floor(Math.random() * 1000000);

    const payment = new Payment({
      payerId: req.user.userId,
      matchId,
      amount,
      orderId: mockOrderId
    });
    await payment.save();

    res.json({ orderId: mockOrderId, amount, currency: 'USD' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Webhook or Verify endpoint (called after successful payment)
router.post('/verify', protect, async (req, res) => {
  try {
    const { orderId, matchId } = req.body;
    
    // In a real app: Verify signature with Stripe/Razorpay here

    const payment = await Payment.findOne({ orderId });
    if (!payment) return res.status(404).json({ message: 'Payment record not found' });

    // Update match payment status to unlock contact info
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    if (req.user.role === 'seeker') match.paymentStatus.seeker = 'paid';
    if (req.user.role === 'recruiter') match.paymentStatus.recruiter = 'paid';
    await match.save();

    // Create Notification
    const notification = new Notification({
      userId: req.user.userId,
      matchId: match._id,
      message: `Payment successful for Match with ID ${match._id}. Contact info is now unlocked!`
    });
    await notification.save();

    res.json({ message: 'Payment verified and contact unlocked', match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
