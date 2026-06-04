require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.set('trust proxy', 1); // Trust first proxy (required for rate limiting behind load balancers/Render)
app.use(helmet());
app.use(cors({ 
  origin: ['https://job-match-platform-xi.vercel.app', 'http://localhost:5173'] 
}));
app.use(express.json({ limit: '10mb' }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 auth requests per windowMs
  message: 'Too many auth requests from this IP, please try again after 15 minutes'
});

// Routes
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-match';

// Start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    require('./services/matchService'); // Start background cron job only after DB connects
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
