const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  requiredSkills: {
    type: [String], // Array of tags
    required: true,
  },
  salaryRange: {
    type: String,
    required: true, // e.g., "50k-70k", "100k+"
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'matched'],
    default: 'open',
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
