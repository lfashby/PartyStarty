var request = require('request');
var twilio = require('twilio');

var db = require('../db.js');
var Invite = require('../model/invite.js');
var User = require('../model/user.js');

var accountSid = process.env.TWILIOSID;
var authToken = process.env.TWILIOAUTHTOKEN;

// Create session
exports.createSession = function(req, res, newUser) {
  req.session.regenerate(function() {
    req.session.user = newUser;
    res.send('authorized');
  })
};
// Check user login
var isLoggedIn = function(req) {
  return req.session ? !! req.session.user : false;
};

exports.checkUser = function(req, res, next) {
  if (!isLoggedIn(req)) {
    res.send('error');
  } else {
    next();
  }
};

exports.sendNotificationSMS = function(eventId) {
  Invite.find({ eventId })
    .exec(function(err, invites) {
      if (err) {
        console.log(`Error getting invites for sending sms: ${err}`);
      } else {
        let host = invites[0].eventHostUserName;
        let phoneNumbersToNotify = [];
        User.findOne({ username: host })
          .exec(function(err, host) {
            phoneNumbersToNotify.push(host.phoneNumber)
            invites.forEach((invite) => {
              User.findOne({ username: invite.invitedUserName })
                .exec(function(err, user) {
                  phoneNumbersToNotify.push(user.phoneNumber);
                }); 
              // TODO use the twilio api to send texts to that array of phone numbers
              var client = new twilio(accountSid, authToken);
              
              phoneNumbersToNotify.forEach((phoneNumber) => {
                client.messages.create({
                  body: 'message about their event being finalized with movie x',
                  to: phoneNumbersToNotify,
                  from: 'TODO put a valid twilio number here after getting the credentials '
                })
                  .then((message) => console.log(`sent message: ${message}`));
              });
            });
          });
      }
    })
};
