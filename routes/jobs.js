const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { Job } = require('../index');

// Get all open jobs (or specific recruiter's jobs)
router.get('/', protect, async (req, res) => {
  try {
    let query = { status: 'open' };
    if (req.user.role === 'recruiter') {
      query.recruiterId = req.user.userId;
    }
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new job post (Recruiters only)
router.post('/', protect, authorize('recruiter'), async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      recruiterId: req.user.userId
    });
    await job.save();
    
    // Trigger matching asynchronously
    const { runMatching } = require('../services/matchService');
    runMatching().catch(console.error);

    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a job post (Recruiters only, must own the job)
router.put('/:id', protect, authorize('recruiter'), async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, recruiterId: req.user.userId });
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a job post
router.delete('/:id', protect, authorize('recruiter'), async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, recruiterId: req.user.userId });
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });
    
    // Delete all matches associated with this job
    const { Match } = require('../index');
    await Match.deleteMany({ jobId: job._id });

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
