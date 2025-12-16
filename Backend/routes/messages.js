const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Send message
router.post('/', authMiddleware, async (req, res) => {
  const { chatID, content, messageType, importanceLevel } = req.body;
  try {
    const uid = uuidv4();
    const message = new Message({
      uid,
      chatID,
      senderID: req.userId,
      content,
      messageType: messageType || 'text',
      importanceLevel: importanceLevel || 'normal'
    });
    await message.save();
    // Emit to socket room
    const io = req.app.get('io');
    io.to(chatID).emit('receiveMessage', message);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get messages for chat
router.get('/:chatId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ chatID: req.params.chatId }).sort({ sentAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;