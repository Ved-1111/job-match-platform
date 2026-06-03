const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { Match } = require('../index');

// Get matches for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'seeker') {
      query.seekerId = req.user.userId;
    } else if (req.user.role === 'recruiter') {
      query.recruiterId = req.user.userId;
    } else {
      return res.status(403).json({ message: 'Admins do not have personal matches' });
    }

    // Populate the other party with ALL fields so we can strip them manually if unpaid
    const matches = await Match.find(query)
      .populate('jobId')
      .populate(req.user.role === 'seeker' ? 'recruiterId' : 'seekerId', 'name email skills companyName experienceLevel resumeUrl');

    // Filter out contact details based on payment status
    const sanitizedMatches = matches.map(m => {
      const matchObj = m.toObject();
      const userRole = req.user.role; // 'seeker' or 'recruiter'
      const hasPaid = matchObj.paymentStatus[userRole] === 'paid';
      
      const otherPartyKey = userRole === 'seeker' ? 'recruiterId' : 'seekerId';
      if (matchObj[otherPartyKey] && !hasPaid) {
        // Strip sensitive info
        delete matchObj[otherPartyKey].name;
        delete matchObj[otherPartyKey].email;
        if (matchObj[otherPartyKey].resumeUrl) delete matchObj[otherPartyKey].resumeUrl;
        
        // Add a helper flag
        matchObj.contactLocked = true;
      } else {
        matchObj.contactLocked = false;
      }
      return matchObj;
    });

    res.json(sanitizedMatches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Trigger manual matching (optional route)
router.post('/trigger', protect, (req, res) => {
  // Can be used to trigger the background service immediately
  res.json({ message: 'Matching process is handled automatically by the background cron job' });
});

module.exports = router;
