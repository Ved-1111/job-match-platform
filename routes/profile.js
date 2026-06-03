const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { User } = require('../index');

// Get own profile
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile (skills, resume, contact info)
router.put('/', protect, async (req, res) => {
  try {
    const { skills, resumeUrl, experienceLevel, companyName } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'seeker') {
      if (skills) user.skills = skills;
      if (resumeUrl) user.resumeUrl = resumeUrl;
      if (experienceLevel) user.experienceLevel = experienceLevel;
    } else if (user.role === 'recruiter') {
      if (companyName) user.companyName = companyName;
    }

    await user.save();
    
    // Trigger matching asynchronously if skills were updated
    if (user.role === 'seeker' && skills) {
      const { runMatching } = require('../services/matchService');
      runMatching().catch(console.error);
    }

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
