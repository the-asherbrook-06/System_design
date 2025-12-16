const mongoose = require('mongoose');

const pollVoteSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  pollID: { type: String, required: true }, // poll uid
  userID: { type: String, required: true }, // user uid
  selectedOption: { type: String, required: true }
});

module.exports = mongoose.model('PollVote', pollVoteSchema);