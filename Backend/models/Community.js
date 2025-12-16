const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: String, required: true }, // user uid
  groupID: [{ type: String }], // array of chat uids (groups)
  channelID: [{ type: String }] // array of chat uids (channels)
});

module.exports = mongoose.model('Community', communitySchema);