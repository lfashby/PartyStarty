const mongoose = require('mongoose');

let InviteSchema = new mongoose.Schema({
  invitedUserName: String,
  eventId: String,
  eventTitle: String,
  eventHostUserName: String,
  eventMoviePictureUrl: String,
  invitedUserGoing: Boolean,
  invitedUserResponded: Boolean
});

module.exports = mongoose.model('Invite', InviteSchema);