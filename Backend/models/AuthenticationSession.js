const mongoose = require('mongoose');

const authSessionSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  userID: { type: String, required: true },
  authToken: { type: String, required: true, unique: true },
  deviceInfo: { type: String },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('AuthenticationSession', authSessionSchema);