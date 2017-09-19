var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var requestHandler = require('./requestHandler.js');
var util = require('./lib/utility');

var app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', util.checkUser, function(req, res) {
  res.render('index');
});

app.post('/addmovie', requestHandler.addMovie);
app.get('/movies', requestHandler.getMovies);
app.post('/movies/upvote', requestHandler.upvote);
app.post('/movies/downvote', requestHandler.downvote);
app.post('/movies/comment', requestHandler.postComment);
app.get('/movies/comment', requestHandler.getComments);
