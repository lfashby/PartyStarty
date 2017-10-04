const mongoose = require('mongoose');

var MovieQueueSchema = new mongoose.Schema({
  title: String,
  poster: String,
  overview: String,
  eventId: String,
  votes: Array,
  totalVotes: Number 
});

module.exports = mongoose.model('Movie', MovieQueueSchema);
