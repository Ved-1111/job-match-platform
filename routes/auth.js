const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../index');

// Setup your secret in .env ideally
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, skills, companyName } = req.body;
    
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

module.exports = router;
