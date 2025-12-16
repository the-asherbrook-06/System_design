const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  messageID: { type: String, required: true }, // message uid
  question: { type: String, required: true },
  options: [{ type: String }], // array of option strings
  expiresAt: { type: Date }
});

module.exports = mongoose.model('Poll', pollSchema);