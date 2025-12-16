const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  messageID: { type: String, required: true }, // message uid
  mediaURL: { type: String, required: true },
  mediaType: { type: String, required: true }, // image, video, audio, document
  isOneTimeView: { type: Boolean, default: false }
});

module.exports = mongoose.model('Media', mediaSchema);