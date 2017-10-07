var db = require('../db.js');
var Event = require('../model/event.js');
var Movie = require('../model/moviequeue.js');
var User = require('../model/user.js');
var Invite = require('../model/invite.js');
var Message = require('../model/message.js');
var util = require('../lib/utility');
var Food = require('../model/food.js')

exports.getPublicEvents = function(req, res) {
  Event.find({ eventPublic: true })
    .exec(function(err, publicEvents) {
      if(err) {
        console.log('Error getting public events: ', err);
        res.send('Error getting public events: ', err);
      } else {
        res.send(publicEvents);
      }
    });
};

exports.updateEvent = function(req, res, next) {
  var eventTitle = req.body.eventTitle;
  var eventUser = req.body.user;
  
  Event.findOne({eventTitle: eventTitle})
  .exec(function(err, event) {
    if(event) {
      event.eventUsers.push(eventUser);
      event.save();
    } else {
      console.log('Event does not exisit');
    }
  });
};

exports.addEvent = function(req, res) {
  
  var eventTitle = req.body.title;
  var eventLocation = req.body.location;
  var eventDate = req.body.date;
  var eventDesc = req.body.description;
  var eventTime = req.body.time;
  var eventPublic = req.body.public;
  // var eventUser = req.session.user.username;
  var eventHostName = req.session.user.username;
  var invitedUserNames = req.body.invitedUserNames;
  // initialized to null, change when the event is finalized
  var eventMoviePictureUrl = null;
  var eventFinalized = false;
  var finalMovieId = '';
  
  Event.create({
    eventTitle,
    eventLocation,
    eventDate,
    eventTime,
    eventDesc,
    eventHostName,
    eventMoviePictureUrl,
    eventFinalized,
    eventPublic,
    finalMovieId
  }, function(err, event) {
    if (err) {
      console.log('error creating an event: ', err);
    } else {
      Invite.create({
        invitedUserName: event.eventHostUserName,
        eventId: event._id,
        eventTitle: event.eventTitle,
        eventHostUserName: event.eventHostName,
        eventMoviePictureUrl: event.eventMoviePictureUrl,
        invitedUserResponded: true,
        invitedUserGoing: true
      }, function(err, invite) {
        if(err) {
          console.log('err creating event host invite', err);
        }
      });
      res.send(event);
    }
  });
};

exports.getEventDetail = function(req, res, next) {
  var eventId = req.params.event_id;
  Event.findOne({_id: eventId})
    .exec(function(err, event) {
      if (event) {
        Movie.find({ eventId })
          .exec(function(err, movies) {
            Food.find({eventId})
              .exec(function(err, foods) {
                res.send({
                  event: event,
                  movies: movies,
                  foods: foods
              })
            });
          });
      } else {
        res.end('Event does not exist', err);
      }
    });
};

exports.getAllEvents = function(req, res, next) {
  Event.find({})
    .exec(function(err, events) {
      if (events) {
        res.send(events);
      } else {
        res.end('Events do not exist', err);
      }
    });
};



exports.getEvents = function(req, res, next) {
  var username = req.session.user.username;

  Invite.find({ invitedUserName: username })
    .exec(function(err, invites) {
    if (err) {
      var errorMsg = `error getting user events: ${err}`;  
      console.log(errorMsg);
      res.send(errorMsg);
    } else {
      Invite.find({ eventHostUserName: username })
        .exec(function(err, hostings) {
          if (err) {
            var errorMsg = `error getting user events: ${err}`;  
            console.log(errorMsg);
            res.send(errorMsg);
          } else {
            let goings = [];
            invites = invites.reduce((acc, invite) => {
              if (invite.invitedUserGoing) {
                goings.push(invite);
              } else {
                acc.push(invite);
              }
              return acc;
            }, []);
            let seen = {};
            hostings = hostings.filter((invite) => {
              if (!seen[invite.eventId]) {
                seen[invite.eventId] = true;
                return true;
              }
              return false;
            });
            res.send({
              username,
              invites,
              goings,
              hostings
            });
          }
        });
    }
  });
};