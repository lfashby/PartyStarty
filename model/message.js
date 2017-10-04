const mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  from: String,
  eventId: String,
  text: String
});

module.exports = mongoose.model('Message', MessageSchema);