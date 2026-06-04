const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { User, OTP } = require('../index');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('799535285735-0i1hnsr9gphl510fqd6vieprq40f0fc9.apps.googleusercontent.com');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in .env");
  process.exit(1);
}

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Setup nodemailer transport (configure via .env)
    // If no .env vars provided, use a free test ethereal account for development
    let transporter;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Save OTP to DB (upsert if exists)
    await OTP.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // Send email
    const info = await transporter.sendMail({
      from: '"HireBridge" <no-reply@hirebridge.com>',
      to: email,
      subject: "Your HireBridge Verification Code",
      text: `Your verification code is: ${otp}. It will expire in 5 minutes.`,
      html: `<h3>Welcome to HireBridge!</h3><p>Your verification code is: <strong>${otp}</strong></p><p>It will expire in 5 minutes.</p>`,
    });

    if (!process.env.EMAIL_USER) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Optionally return the preview URL in dev so the user can easily click it
      return res.json({ message: 'OTP sent to test email', previewUrl: nodemailer.getTestMessageUrl(info) });
    }

    res.json({ message: 'OTP sent successfully to ' + email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, skills, companyName, otp } = req.body;
    
    // Verify OTP
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired or not requested' });
    }
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP valid, delete it
    await OTP.deleteOne({ email });
    
    // In a real app, hash the password:
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // For simplicity, we are saving password as is or omitting if not in schema

    const newUser = new User({ name, email, role, skills, companyName });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    // In real app:
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return ...

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Google Login/Register
router.post('/google', async (req, res) => {
  try {
    const { token, role, companyName } = req.body;
    let name, email, picture;
    
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '799535285735-0i1hnsr9gphl510fqd6vieprq40f0fc9.apps.googleusercontent.com',
      });
      
      const payload = ticket.getPayload();
      name = payload.name;
      email = payload.email;
      picture = payload.picture;
    } catch (err) {
      // Fallback: If it's not a valid ID Token, verify it as an Access Token (such as ya29...)
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to verify access token with Google: ' + response.statusText);
      }
      const payload = await response.json();
      name = payload.name;
      email = payload.email;
      picture = payload.picture;
    }
    
    let user = await User.findOne({ email });
    
    if (!user) {
      // Register new user
      const userRole = role || 'seeker';
      const userObj = {
        name,
        email,
        role: userRole,
        profilePicture: picture,
      };
      
      if (userRole === 'recruiter') {
        userObj.companyName = companyName || 'Company';
      }
      
      user = new User(userObj);
      await user.save();
    }
    
    // Generate local JWT
    const localToken = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({ token: localToken, user });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Google Auth verification failed' });
  }
});

module.exports = router;
