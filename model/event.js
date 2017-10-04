const mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true
  },
  eventLocation: {
    type: String,
    required: true
  },
  eventDate: Date,
  eventTime: String,
  eventDesc: String,
  eventFinalized: Boolean,
  eventHostName: String,
  eventMoviePicture: String 
});

module.exports = mongoose.model('Event', EventSchema);
