const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const partial = require('express-partial');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const bodyParser = require('body-parser') ;
const path = require('path');
const webpackConfig = require('./webpack.config.js');
const requestHandler = require('./requestHandler.js');
const util = require('./lib/utility');
const Message = require('./model/message.js');
const morgan = require('morgan');
const recipeRouter = require('./Routes/food.js');
const app = express();

// sockets for the chat app
var http = require('http').Server(app);
var io = require('socket.io')(http);

const compiler = webpack(webpackConfig);

app.use(morgan('tiny'));
app.use(express.static(__dirname + '/www'));
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
app.use(partial());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json()); 
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src'));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// This will create a set interval, checking how often you pass in in milliseconds (defaults to 600000)
// for events about to start, if one is about to start, it will send out a text reminder to that user
util.regularlyCheckForUpcomingEvents(60000);

// socket connections 
io.on('connection', function(socket) {
  console.log(`connection from socket: ${socket}`);
  socket.on('chat', function(msg) {
    console.log(`Got message: ${JSON.stringify(msg)}`);
    let { text, from , eventId } = msg;
    eventId = eventId || '';
    Message.create({
      from,
      text,
      eventId
    }, function(err, message) {
      if (err) {
        console.log(`Error adding message to DB: ${err}`);
        io.emit(msg.eventId, {text: 'Error getting msg', from:'server'});
      } else {
        io.emit(msg.eventId, msg);
      }
    })
  });
});

// Get persisted Chat messages 
app.get(['/chat/:eventId', '/chat'], util.checkUser, requestHandler.getChatMessages);

// User Account handling
app.post('/signup', requestHandler.addUser);
app.post('/signin', requestHandler.getUser);
app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.send('logout');
  });
});

// Invites
app.post('/invite', util.checkUser, requestHandler.addInvite);

// Events 
app.post('/create', util.checkUser, requestHandler.addEvent);
app.get('/publicEvents', util.checkUser, requestHandler.getPublicEvents);
app.get('/getEvents', util.checkUser, requestHandler.getEvents);
app.get('/event/:event_id', requestHandler.getEventDetail);
// app.get('/event/:event_id', util.checkUser, requestHandler.getEventDetail);

// Movies
app.post('/addMovies', util.checkUser, requestHandler.addMovies);
app.put('/movies', requestHandler.updateMovies);
// app.put('/movies', util.checkUser, requestHandler.updateMovies);
app.get('/movies', util.checkUser, requestHandler.getMovies);
app.post('/recipes', recipeRouter);

// Catch All
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'home.js'));
});

// Invoke the server to listen on a port
const port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
