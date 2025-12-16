const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('Tag', tagSchema);