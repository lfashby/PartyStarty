const mongoose = require('mongoose');

var MovieQueueSchema = new mongoose.Schema({
  title: String,
  poster: String,
  overview: String,
  eventId: String,
  votes: Number,
  totalUserVotes: Number,
  votesByUser: Array 
});

module.exports = mongoose.model('Movie', MovieQueueSchema);
