const express = require('express');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const AuthenticationSession = require('../models/AuthenticationSession');

const router = express.Router();

// Register
router.post('/register', [
  body('phoneNumber').isMobilePhone(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { phoneNumber, email, password, name } = req.body;
  try {
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    const uid = uuidv4();
    const user = new User({ uid, phoneNumber, email, passwordHash, name });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    const user = await User.findOne({ email, passwordHash });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const authToken = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = new AuthenticationSession({
      uid: uuidv4(),
      userID: user.uid,
      authToken,
      deviceInfo: req.body.deviceInfo || 'unknown',
      expiresAt
    });
    await session.save();
    res.json({ authToken, user: { uid: user.uid, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  try {
    await AuthenticationSession.deleteOne({ authToken: token });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;