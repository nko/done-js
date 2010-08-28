/**
 * Module dependencies.
 */ 
require.paths.unshift(__dirname+"/lib/")
require.paths.unshift(__dirname + '/vendor/')
var express = require('express'),
  connect = require('connect'),
  websocket = require('websocket-server');

var app = express.createServer();
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(connect.bodyDecoder());
  app.use(connect.methodOverride());
  app.use(connect.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(connect.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(connect.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(connect.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index.jade', {
    locals: {
      title: 'Drop Node'
    }
  });
});

app.get("/file/:token", function(req, res){
  var token = req.params.token;
  console.log("GET request for " + token);
  res.send("token: " + token);
});

app.put("/file/:token", function(req, res){
  var token = req.params.token;
  console.log("PUT for " + token);
});

app.listen(parseInt(process.env.PORT) || 3000, null, function(){
  console.log("Server started on port 3000")
});

var wsserver = websocket.createServer({server: app})
// TODO: nifty websocket sharer/server control comms
