const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  profileURL: { type: String },
  status: { type: String },
  lastSeen: { type: Date },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);