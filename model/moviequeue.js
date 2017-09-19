const mongoose = require('mongoose');

var MovieQueueSchema = new mongoose.Schema({
  upvotes: Number,
  downvotes: Number,
  poster: String, 
  overview: String,
  releaseDate: String,
  title: String,
  popularity: Number,
  voteCount: Number,
  voteAvg: Number
  event: { type: String,
    required: true
  }

});

module.exports = mongoose.model('Job', JobSchema);
