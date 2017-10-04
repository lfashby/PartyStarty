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
                username,
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
    var eventPublic = req.body.public;
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
            eventDate,
            eventTime,
            eventDesc,
            eventHostName,
            eventMoviePictureUrl,
            eventFinalized,
            eventPublic
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
        addMovies: function(req, res) {
          let movies = req.body.movies;
          let eventId = req.body.eventId;
          movies.forEach(function(movie) {
            let title = movie.title;
            let poster = movie.poster;
            let overview = movie.overview;
            let votes = movie.votes;
            let votesByUser = [];
            let totalUserVotes = 0;
            Movie.create({
              title,
              poster,
              overview,
              eventId,
              votes,
              totalUserVotes,
              votesByUser
            },function(err, movie) {
              if(err) {
                console.log('error making movie: ', err);
                res.send('Error making movie: ', err);
              } 
            });
          });
        },
        
        addInvite: function(req, res) {
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
        },

        updateMovies: function(req, res) {
          let movies = req.body.movies;

          movies.forEach(function(movieOption) {
            Movie.findOne({ _id: movie.movieId })
              .exec(function(err, movie) {
                if (err) {
                  console.log('Error updating movie votes: ', err);
                  res.send('Error updating movie votes: ', err);
                } else {
                  // remove current user votes from array
                  let newVotesByUser = movie.votesByUser.filter(obj => obj.username !== movieOption.username);
                  newVotesByUser.push({
                    username: movieOption.username,
                    votes: movieOption.votes
                  });
                  movie.votesByUer = newVotesByUser;
                  movie.totalUserVotes = movie.votesByUser.reduce((acc, obj) => obj.votes + acc, 0);
                  movie.save();
                }              
              });
          });
        },

        getMovies: function(req, res) {
          let eventId = req.body.eventId;

          Event.findOne({ _id: eventId })
            .exec(function(err, event) {
              if(err) {
                console.log('Error getting event info for event: ', err);
                res.send('Error getting event info for event: ', err);
              } else {
                Movie.find({ eventId })
                  .exec(function(err, movies) {
                    if(err) {
                      console.log('error getting movies to send back for event: ', err);
                      res.send('error getting movies to send back for event: ', err);
                    } else {
                      Invite.find({ eventId })
                        .exec(function(err, invites) {
                          if(err) {
                            console.log('Error getting invites for event: ', err);
                            res.send('Error getting invites for event: ', err);
                          } else {
                            res.send({
                              event,
                              movies,
                              invites
                            });
                          }
                        });
                    }
                  });
              }
            });
        },

        getPublicEvents: function(req, res) {
          Event.find({ eventPublic: true })
            .exec(function(err, publicEvents) {
              if(err) {
                console.log('Error getting public events: ', err);
                res.send('Error getting public events: ', err);
              } else {
                res.send(publicEvents);
              }
            });
        }
      };
      