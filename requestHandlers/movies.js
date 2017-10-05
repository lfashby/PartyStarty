var db = require('../db.js');
var Event = require('../model/event.js');
var Movie = require('../model/moviequeue.js');
var User = require('../model/user.js');
var Invite = require('../model/invite.js');
var Message = require('../model/message.js');
var util = require('../lib/utility');

exports.getMovies = function(req, res) {
  let eventId = req.query.eventId;
  console.log(eventId)

  Event.findOne({ _id: eventId })
    .exec(function(err, event) {
      if(err) {
        console.log('Error getting event info for event: ', err);
        res.send('Error getting event info for event: ', err);
      } else {
        Movie.find({ eventId })
          .exec(function(err, movies) {
            if(err) {
              console.log('Error getting movies to send back for event: ', err);
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
};

exports.updateMovies = function(req, res) {
  let movies = req.body.movies;
  movies.forEach(function(movieOption) {
    Movie.findOne({ _id: movieOption._id })
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
          movie.votesByUser = newVotesByUser;
          movie.totalUserVotes = movie.votesByUser.reduce((acc, obj) => obj.votes + acc, 0);
          movie.save();
          res.end();
        }              
      });
  });
};

exports.addMovies = function(req, res) {
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
};

exports.getMovie = function(req, res) {
  Movie.find().exec(function(err, movies) {
    if (movies) {
      res.status(200).send(movies);
    } else {
      res.end('Movie queue does not exist');
    }
  });
};