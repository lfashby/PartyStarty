var request = require('request');
var db = require('../db.js');
var Invite = require('../model/invite.js');
var User = require('../model/user.js');
var Event = require('../model/event.js');
var Invite = require('../model/invite.js');
var Movie = require('../model/moviequeue.js');

const config = require('../config.js');
var client = require('twilio')(config.twilio_sid, config.twilio_auth);

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

const checkForUpcomingEvents = () => {
  let now = new Date();
  let todaysYear = now.getFullYear();
  let todaysMonth = now.getMonth();
  let todaysDay = now.getDay();
  Event.find({})
    .exec((err, events) => {
      if(err) {
        console.log(`Error getting events to check for upcoming! ${err}`);
      } else {
        console.log(`checking now: ${now} for events about to start`);
        events.forEach((event) => {
          let eventDate = new Date(event.eventDate);
          let eventYear = eventDate.getFullYear();
          let eventMonth = eventDate.getMonth();
          let eventDay = eventDate.getDay();
          if (eventYear === todaysYear && eventMonth === todaysMonth && eventDay === (todaysDay - 1)) {
            // it is one day before the event, send a reminder to all that, calculate and set the final movie
            Movie.find({ eventId: event._id })
              .exec((err, movies) => {
                if (err) {
                  console.log(`Error getting final movie: ${err}`);
                } else {
                  if (movies) { 
                    let finalMovie = movies.reduce((acc, movie) => movie.totalUserVotes > acc.totalUserVotes ? movie : acc);
                    event.finalMovieId = finalMovie._id;
                    event.eventMoviePicture = finalMovie.poster;
                    event.eventFinalized = true;
                    event.save();
                  }
                }
              });
            // were invited and accepted the invite to the event (The host should also have an invite)
            Invite.find({ eventId: event._id })
              .exec((err, invites) => {
                if(err) {
                  console.log(`Error getting invites for an event to send reminders ${err}`);
                } else {
                  invites.forEach((invite) => {
                    // get the invited User
                    User.find({ username: invite.invitedUserName })
                      .exec((err, user) => {
                        if (err) {
                          console.log(`Error finding invited users: ${err}`);
                        } else {
                          let phone = '+14103000102' || user.phoneNumber;
                          if (phone) {
                            // send twilio text
                            console.log(`Sending text to ${user.username}`);
                            client.messages.create({
                              body: `
                                Hi ${user.username},
                                  You were invited to the ${event.eventTitle}:
                                  ${event.eventDesc}
                                  Hosted by: ${event.eventHostUserName}
                                  Today is ${new Date()}
                                  The event is on ${new Date(event.eventDate)}
                                  You ${invite.invitedUserGoing ? 'are' : 'aren\'t'} marked as attending
                              `,
                              to: phone,
                              from: config.twilio_number
                            })
                              .then((message) => console.log(`sent message: ${message}`));
                          }
                        }
                      });
                  });
                }
              });
          }
        });
      }
    });
};

exports.regularlyCheckForUpcomingEvents = function(timePeriod = 600000) {
  setInterval(checkForUpcomingEvents, timePeriod);
};
