const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Poll = require('../models/Poll');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create poll
router.post('/', authMiddleware, async (req, res) => {
  const { messageID, question, options, expiresAt } = req.body;
  try {
    const uid = uuidv4();
    const poll = new Poll({ uid, messageID, question, options, expiresAt });
    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get poll for message
router.get('/:messageId', authMiddleware, async (req, res) => {
  try {
    const poll = await Poll.findOne({ messageID: req.params.messageId });
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;