const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  chatType: { type: String, required: true, enum: ['private', 'group', 'channel'] },
  isArchived: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }], // array of tag uids

  // For private (direct)
  userA: { type: String },
  userB: { type: String },

  // For group
  groupName: { type: String },
  description: { type: String },
  createdBy: { type: String }, // user uid
  adminID: [{ type: String }], // array of user uids
  members: [{ type: String }], // array of user uids
  announcementOnly: { type: Boolean, default: false },

  // For channel
  name: { type: String },
  members: [{ type: String }] // for channel, members array
});

module.exports = mongoose.model('Chat', chatSchema);