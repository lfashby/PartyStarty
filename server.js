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
const morgan = require('morgan');


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

// socket connections 
io.on('connection', function(socket) {
  console.log(`connection from socket: ${socket}`);
});

app.post('/signup', requestHandler.addUser);

app.post('/signin', requestHandler.getUser);

app.post('/invite', util.checkUser, requestHandler.addInvite);

app.post('/create', util.checkUser, requestHandler.addEvent);

app.post('/addMovies', util.checkUser, requestHandler.addMovies);

app.get('/getEvents', util.checkUser, requestHandler.getEvents);


app.get('/event/:event_id', requestHandler.getEventDetail);
// app.get('/event/:event_id', util.checkUser, requestHandler.getEventDetail);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'home.js'));
});

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.send('logout');
  });
});

const port = process.env.PORT || 3000;

http.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
