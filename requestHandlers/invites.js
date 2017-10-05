var db = require('../db.js');
var Event = require('../model/event.js');
var Movie = require('../model/moviequeue.js');
var User = require('../model/user.js');
var Invite = require('../model/invite.js');
var Message = require('../model/message.js');
var util = require('../lib/utility');

exports.addInvite = function(req, res) {
  // TODO get the new invite info from the request object
  let invitedUserName = req.body.invitedUserName;
  let eventId = req.body.eventId;
  let eventTitle = req.body.eventTitle;
  let eventHostUserName = req.session.user.username;
  let eventMoviePictureUrl = '';
  User.findOne({ username: invitedUserName })
    .exec(function(err, user) {
      if(!user) {
        console.log('Error finding user for creating invite: ', err);
        res.send('error');
      } else {
        Invite.create({
          invitedUserName,
          eventId,
          eventTitle,
          eventHostUserName,
          eventMoviePictureUrl,
          invitedUserResponded: false,
          invitedUserGoing: null
        },function(err, invite) {
          if (err) {
            console.log('Error creating invite: ', err);
            res.send('error');
          } else {
            res.send('success')
          }
        });
      }
    }); 
};

exports.removeInvite = function(req, res) {
<<<<<<< HEAD
  // console.log(req.body.username);
  console.log('removinerer', req)
  Invite.remove({ 
    username: req.body.username, 
=======
  Invite.remove({ 
    invitedUserName: req.body.username, 
>>>>>>> features
    eventHostUserName: req.session.user.username,
    eventId: req.body.eventId
   }, function(err) {
    if (err) {
      res.send('Bad');
    } else {
      res.send('Good');
    }
  })
  // res.send('You did it');
}






// "_id": {
//   "$oid": "59d694039fb0d830e9226fd6"
// },
// "invitedUserName": "p",
// "eventId": "59d693ff9fb0d830e9226fd1",
// "eventTitle": "l",
// "eventHostUserName": "l",