var db = require('../db.js');
var Event = require('../model/event.js');
var Movie = require('../model/moviequeue.js');
var User = require('../model/user.js');
var Invite = require('../model/invite.js');
var Message = require('../model/message.js');
var util = require('../lib/utility');

exports.getChatMessages = function(req, res) {
  let eventId = req.params.eventId || '';

  // Message.find({})
  Message.find({ eventId })
    .exec(function(err, messages) {
      if(err) {
        console.log('Error getting chat messages: ', err);
        res.send('Error getting chat messages: ', err);
      } else {
        res.send(messages);
      }
    });
}