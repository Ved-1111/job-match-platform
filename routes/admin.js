const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { User, Job, Match, Payment } = require('../index');

// Middleware to ensure user is admin
router.use(protect);
router.use(authorize('admin'));

// Get platform stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSeekers = await User.countDocuments({ role: 'seeker' });
    const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
    
    const totalJobs = await Job.countDocuments();
    const openJobs = await Job.countDocuments({ status: 'open' });
    
    const totalMatches = await Match.countDocuments();
    
    // Sum all payments
    const payments = await Payment.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);
    const revenue = payments.length > 0 ? payments[0].totalRevenue : 0;

    res.json({
      users: { total: totalUsers, seekers: totalSeekers, recruiters: totalRecruiters },
      jobs: { total: totalJobs, open: openJobs },
      matches: totalMatches,
      revenue
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User management: Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User management: Verify a recruiter
router.put('/users/:id/verify', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'recruiter') {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    
    user.isVerified = true;
    await user.save();
    res.json({ message: 'Recruiter verified successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
