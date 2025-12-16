const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      email: user.email,
      name: user.name,
      profileURL: user.profileURL,
      status: user.status,
      lastSeen: user.lastSeen,
      joinedAt: user.joinedAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/:id', authMiddleware, async (req, res) => {
  if (req.userId !== req.params.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const updates = req.body;
    delete updates.passwordHash; // Prevent password update here
    const user = await User.findOneAndUpdate({ uid: req.params.id }, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;