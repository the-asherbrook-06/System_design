const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Chat = require('../models/Chat');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create chat
router.post('/', authMiddleware, async (req, res) => {
  const { chatType, userA, userB, groupName, description, createdBy, adminID, members, name, tags } = req.body;
  try {
    const uid = uuidv4();
    let chatData = { uid, chatType, tags: tags || [] };
    if (chatType === 'private') {
      chatData.userA = userA;
      chatData.userB = userB;
    } else if (chatType === 'group') {
      chatData.groupName = groupName;
      chatData.description = description;
      chatData.createdBy = createdBy;
      chatData.adminID = adminID || [];
      chatData.members = members || [];
    } else if (chatType === 'channel') {
      chatData.name = name;
      chatData.description = description;
      chatData.createdBy = createdBy;
      chatData.members = members || [];
    }
    const chat = new Chat(chatData);
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's chats
router.get('/', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [
        { userA: req.userId },
        { userB: req.userId },
        { members: req.userId }
      ]
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Archive chat
router.put('/:id/archive', authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findOneAndUpdate(
      { uid: req.params.id },
      { isArchived: true },
      { new: true }
    );
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.json({ message: 'Chat archived successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;