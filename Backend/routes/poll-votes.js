const express = require('express');
const { v4: uuidv4 } = require('uuid');
const PollVote = require('../models/PollVote');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Vote on poll
router.post('/', authMiddleware, async (req, res) => {
  const { pollID, selectedOption } = req.body;
  try {
    // Check if already voted
    const existingVote = await PollVote.findOne({ pollID, userID: req.userId });
    if (existingVote) {
      return res.status(400).json({ error: 'Already voted' });
    }
    const uid = uuidv4();
    const vote = new PollVote({ uid, pollID, userID: req.userId, selectedOption });
    await vote.save();
    res.status(201).json(vote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get votes for poll
router.get('/:pollId', authMiddleware, async (req, res) => {
  try {
    const votes = await PollVote.find({ pollID: req.params.pollId });
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;