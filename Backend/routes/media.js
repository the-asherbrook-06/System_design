const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Media = require('../models/Media');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create media
router.post('/', authMiddleware, async (req, res) => {
  const { messageID, mediaURL, mediaType, isOneTimeView } = req.body;
  try {
    const uid = uuidv4();
    const media = new Media({ uid, messageID, mediaURL, mediaType, isOneTimeView });
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get media for message
router.get('/:messageId', authMiddleware, async (req, res) => {
  try {
    const media = await Media.find({ messageID: req.params.messageId });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;