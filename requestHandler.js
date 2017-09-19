var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var key = require('dotenv').config();

var db = require('../db.js');
var Event = require('../model/event.js');
var Movie = require('../model/moviequeue.js');
var User = require('../model/user.js');

module.exports = {
  // User log in
  getUser: function(req, res, next) {
    User.find().exec(function(err, users) {
      if (users) {
        res.status(200).send(users);
      } else {
        res.end('User does not exist');
      }
    });
  },
  // User sign up
  addUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
      .exec(function(err, user) {
        if(!user) {
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.has(password, salt, function(err, has) {
              if (err) {
                throw err;
              } else {
                User.create({
                  username: username,
                  password: hash
                });
              }
            });
          });
        } else {
          console.log('Account already exists');
          res.redirect('/signup');
        }
      });
  },
  // Retrieve existing events
  getEvent: function(req, res, next) {
    Event.find().exec(function(err, events) {
      if (events) {
        res.status(200).send(events);
      } else {
        res.end('Event does not exist');
      }
    });
  },
  // Create event
  addEvent: function(req, res) {
    var eventTitle = req.body.eventTitle;
    var eventLocation = req.body.eventLocation;
    var eventTime = req.body.eventTime;
    var eventUsers = req.body.user;

    Event.findOne({eventTitle: eventTitle})
      .exec(function(err, event) {
        if(!event) {
          Event.create({
            eventTitle: eventTitle,
            eventLocation: eventLocation,
            eventTime: eventTime,
            eventUsers: [eventUsers]
          })
        } else {
          console.log('Event does not exisit');
        }
      });
  },
  // Add user to event
  updateEvent: function(req, res, next) {
    var eventTitle = req.body.eventTitle;
    var eventUser = req.body.user;

    Event.findOne({eventTitle: eventTitle})
      .exec(function(err, event) {
        if(!event) {
          { "$push": { "eventUsers": eventUser } },
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
    var title = req.body.title.split(' ').join('+');;
    // var year = req.body.year;
    var event = req.body.event;

    Movie.findOne({title: title, event: event})
      .exec(function(err, movie) {
        if(movie) {
          console.log('Movie found in queue');
          res.status(200).send(movie);
        } else {
          var movieRequest = 'https://api.themoviedb.org/3/search/movie?api_key=&query=' + process.env.MOVIEDB_KEY + title;
          request(movieRequest, function(err, res, html) {
          if (err) {
            console.log(err);
          } else {
            var movieEntry = JSON.parse(html);
            if(movieEntry.title) {
              console.log('Movie found through API');
              var newMovie = new Movie({
                upvotes: 0,
                downvotes: 0,
                poster: movieEntry.poster_path, 
                overview: movieEntry.overview,
                releaseDate: movieEntry.release_date,
                title: movieEntry.title,
                popularity: movieEntry.popularity,
                voteCount: movieEntry.vote_count,
                voteAvg: movieEntry.vote_average,
                event: event
              }

              });
              newMovie.save(function(err, entry) {
                if(err) {
                  res.send(500,err);
                }
                else {
                  console.log('Sending back to client', entry);
                  res.json(entry);
                } 
              });
            } else {
              console.log('Nothing found');
              res.send(200);              
            }
          }
        });
        }
      })
  },
  // upvote movie
  upvote: function() {

  },
  // downvote movie
  downvote: function() {

  }

};
