var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var key = require('dotenv').config();

var db = require('./db.js');
var Event = require('./model/event.js');
var Movie = require('./model/moviequeue.js');
var User = require('./model/user.js');
var Invite = require('./model/invite.js');
var util = require('./lib/utility');

module.exports = {
  // User log in
  getUser: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        console.log('User doesn\'t exisit');
        res.send('error');
      } else {
        if (password === user.password) {
          util.createSession(req, res, user);
          console.log('session created', user);
        } else {
          console.log('user or password wrong');
          res.send('error');
        }
      }
    });
  },
  // User sign up
  addUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    // need to add this to the sign up form TODO
    var phoneNumber = req.body.phoneNumber;

    User.findOne({username: username})
      .exec(function(err, user) {
        if(!user) {
          if (err) {
            throw err;
          } else {
            User.create({
              username,
              password,
              phoneNumber
            }, function(err, user) {
                util.createSession(req, res, user);
            });
          }
        } else {
          console.log('Account already exists');
          res.send('error');
        }
      });
  },
  // Retrieve existing events for particular user
  getEvents: function(req, res, next) {
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
              res.send({
                boogy: 'boogy',
                invites,
                goings,
                hostings
              });
            }
          });
      }
    });
  },

  // Retrieve event details
  getEventDetail: function(req, res, next) {
    // var eventTitle = req.body.event;
    var eventId = req.params.event_id;
    Event.findOne({_id: eventId})
      .exec(function(err, event) {
        if (event) {
          console.log('got the event', event);
          Movie.find({ eventId })
            .exec(function(err, movies) {
              res.send({
                event: event,
                movies: movies
              });
            });
        } else {
          res.end('Event does not exist');
        }
      });
  },
  // Create event
  addEvent: function(req, res) {
    console.log('HELLLLO', req.body);
    
    var eventTitle = req.body.title;
    var eventLocation = req.body.location;
    var eventDate = req.body.date;
    var eventDesc = req.body.description;
    var eventTime = req.body.time;
    // var eventUser = req.session.user.username;

    // new needed information TODO
    var eventHostName = req.session.user.username;
    // TODO an array of user names or ids
    var invitedUserNames = req.body.invitedUserNames;
    // initialized to null, change when the event is finalized
    var eventMoviePictureUrl = null;
    var eventFinalized = null;
    
    Event.create({
            eventTitle,
            eventLocation,
            eventTime,
            eventDesc,
            eventHostName,
            eventMoviePictureUrl,
            eventFinalized
          }, function(err, event) {
            if (err) {
              console.log('error creating an event: ', err);
            }
            else {
              invitedUserNames.forEach((invitedUserName) => {
                Invite.create({
                  invitedUserName,
                  eventId: event._id,
                  eventTitle: event.eventTitle,
                  eventHostUserName: event.eventHostUserName,
                  eventMoviePictureUrl: event.eventMoviePictureUrl,
                  invitedUserResponded: false,
                  invitedUserGoing: null
                });
              });
              Invite.create({
                invitedUserName: event.eventHostUserName,
                eventId: event._id,
                eventTitle: event.eventTitle,
                eventHostUserName: event.eventHostUserName,
                eventMoviePictureUrl: event.eventMoviePictureUrl,
                invitedUserResponded: false,
                invitedUserGoing: null
              });
            }
          });
  },
  // Add user to event
  updateEvent: function(req, res, next) {
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
  },
  // Retrieve existing movie queue
  getMovie: function(req, res) {
    Movie.find().exec(function(err, movies) {
      if (movies) {
        res.status(200).send(movies);
      } else {
        res.end('Movie queue does not exist');
      }
    });
  },
  // Create new movie queue
  addMovie: function(req, res) {
    console.log(req.body);
    var title = req.body.currentMovie.title;
    var event = req.body.event;

    Movie.findOne({title: title, event: event})
      .exec(function(err, movie) {
        if(movie) {
          console.log('Movie already in queue');
          res.status(200).send(movie);
        } else {
          console.log('Movie not in queue yet');
          var movieId = req.body.currentMovie.id;
          var moviePoster = req.body.currentMovie.poster;
          var movieOverview = req.body.currentMovie.overview;
          var movieVotes = req.body.currentMovie.votes;

          Movie.create({
                  title: title,
                  id: movieId,
                  poster: moviePoster,
                  overview: movieOverview,
                  votes: movieVotes,
                  upvotes: 0,
                  downvotes: 0,
                  event: [event]
                }, function(err, movie) {
                  console.log('Movie added to queue');
                  res.send(movie);
                });
          }
        });
  }
};
