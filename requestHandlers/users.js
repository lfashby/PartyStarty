var db = require('../db.js');
var Event = require('../model/event.js');
var Movie = require('../model/moviequeue.js');
var User = require('../model/user.js');
var Invite = require('../model/invite.js');
var Message = require('../model/message.js');
var util = require('../lib/utility');

exports.addUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var phoneNumber = req.body.phone;

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
};

exports.getUser = function(req, res, next) {
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
};

exports.checkLogin = function(req, res) {
    res.send({'data': req.session.user || 'no user!'});
};