const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['seeker', 'recruiter', 'admin'],
    required: true,
  },
  // Common fields can go here (e.g., name, email, password)
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  // Seeker-specific fields
  skills: {
    type: [String],
    default: undefined,
  },
  resumeUrl: {
    type: String,
  },
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Mid', 'Senior', 'Executive'],
  },

  // Recruiter-specific fields
  companyName: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Optional: Validation to ensure specific fields exist based on role
userSchema.pre('save', function (next) {
  if (this.role === 'seeker') {
    if (!this.skills) this.skills = [];
  }
  if (this.role === 'recruiter') {
    if (!this.companyName) return next(new Error('Company name is required for recruiters'));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
