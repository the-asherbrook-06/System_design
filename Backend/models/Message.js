const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  chatID: { type: String, required: true }, // chat uid
  senderID: { type: String, required: true }, // user uid
  content: { type: String },
  messageType: { type: String, required: true }, // e.g., text, media, poll
  importanceLevel: { type: String, default: 'normal' }, // low, normal, high
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);