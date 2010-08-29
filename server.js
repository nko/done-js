/**
 * Module dependencies.
 */ 
require.paths.unshift(__dirname+"/lib/")
require.paths.unshift(__dirname + '/vendor/')
var express = require('express'),
  connect = require('connect'),
  transfer = require('transfer'),
  bitly = require('bitly'),
  twitter = require('twitter'),
  websocket = require('websocket-server'),
  ResourceMan = require('resourceman');

var BASE_URL = 'http://done-js.no.de:3000'
var WS_PORT = 3081;

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

// REMOVE THIS -- creates Channel, which the websocket code will eventually do
transfer.TOKENS["abc"] = new transfer.Channel("thing.txt");

app.get("/file/:token", function(req, res){
  var token = req.params.token;
  console.log("GET request for " + token);
  transfer.getFile(token, res);
});

app.put("/file/:token", function(req, res){
  var token = req.params.token;
  console.log("PUT for " + token);
  transfer.putFile(token, req.rawBody, res);
});


var shorten = function(token, callback){
  // FIXME detect the host & port
  var url = "http://done-js.no.de/file/" + token;
  bitly.shorten(url, callback);
};

app.get("/shorten/:token", function(req, res){
  var token = req.params.token;
  shorten(token, function(err, result) {
   res.send(result);
  });
});

app.post("/tweet/:token", function(req, res){
  var token = req.params.token;
  var handle = req.body.handle;
  shorten(token, function(err, url) {
    var message = "Dropnode file available at " + url;
    twitter.dm(handle, message, function(err, result){
      if (err) {
        // for now, incorrectly assume that the DM failed because the handle 
        // is not following donejs
        res.send("Could not DM " + handle + ". Please make sure they are following <a href='http://twitter.com/donejs'>donejs</a>.", 400)
      } else {
        res.send(200);
      }
    });
  });
});


app.listen(parseInt(process.env.PORT) || 3000, null, function(){
  console.log("Server started on port 3000")
});

var wsserver = websocket.createServer();
wsserver.listen(WS_PORT);
var resourceman = new ResourceMan(wsserver, BASE_URL);
