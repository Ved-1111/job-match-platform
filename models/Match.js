const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  seekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  matchScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100, // Percentage of skills matched
  },
  paymentStatus: {
    seeker: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    recruiter: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
  },
}, { timestamps: true });

// Ensure a seeker and job only have one match
matchSchema.index({ jobId: 1, seekerId: 1 }, { unique: true });

module.exports = mongoose.model('Match', matchSchema);
