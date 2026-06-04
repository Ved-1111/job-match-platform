const mongoose = require('mongoose');

// Import all models
const User = require('./models/User');
const Job = require('./models/Job');
const Match = require('./models/Match');
const Payment = require('./models/Payment');
const Notification = require('./models/Notification');
const OTP = require('./models/OTP');

// Export models as a single module for easy access
module.exports = {
  User,
  Job,
  Match,
  Payment,
  Notification,
  OTP,
};

// Example usage to connect to DB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB successfully.'))
//   .catch(err => console.error('MongoDB connection error:', err));
