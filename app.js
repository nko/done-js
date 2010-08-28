
/**
 * Module dependencies.
 */
require.paths.unshift(__dirname+"/lib/")
require(__dirname+"/vendor/") // local vendor libs
var express = require('express'),
  connect = require('connect');

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
      title: 'Express'
    }
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000")
});
