var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var key = require('dotenv').config();

var users = require('./requestHandlers/users.js');
var invites = require('./requestHandlers/invites.js');
var movies = require('./requestHandlers/movies.js');
var chat = require('./requestHandlers/chat.js');
var events = require('./requestHandlers/events.js');

module.exports = {
  // USER handlers
  getUser: users.getUser,
  addUser: users.addUser,
  
  // EVENT handlers
  getEvents: events.getEvents,
  getEventDetail: events.getEventDetail,
  addEvent: events.addEvent,
  getPublicEvents: events.getPublicEvents,
  updateEvent: events.updateEvent,

  // MOVIE handlers
  getMovie: movies.getMovie,
  addMovies: movies.addMovies,
  updateMovies: movies.updateMovies,
  getMovies: movies.getMovies,

  // INVITE handlers
  addInvite: invites.addInvite,

  // CHAT handlers
  getChatMessages: chat.getChatMessages
};
      