/**
 * Module dependencies.
 */ 
require.paths.unshift(__dirname+"/lib/")
require.paths.unshift(__dirname + '/vendor/')
var express = require('express'),
  connect = require('connect'),
  websocket = require('websocket-server'),
  ResourceMan = require('resourceman'),
  routes = require('routes')
  config = require('config');

var app = (function(){
  var app = express.createServer();
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
  return app;
})();
// Custom config management
var settings = config.load(app.settings['env']);

// Routes
routes.wire(app, settings);

app.listen(parseInt(process.env.PORT) || 3000, null, function(){
  console.log("Server started on port 3000")
});

var wsserver = websocket.createServer();
wsserver.listen(settings.resourceman.wsPort);
var resourceman = new ResourceMan(wsserver, settings.baseUrl);

app.get("/file/:token", function(req, res){
  var token = req.params.token;
  console.log("GET request for " + token);
  resourceman.handleHttpGet(token, res);
});

app.put("/file/:token", function(req, res){
  var token = req.params.token;
  console.log("PUT for " + token);
  resourceman.handleHttpPut(token, req.rawBody, res);
});


