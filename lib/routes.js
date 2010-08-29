var bitly = require('bitly'),
  twitter = require('twitter'),
  common = require('common');
  
exports.wire = function(app, settings, resourceManager){
  app.get('/', function(req, res){
    res.render('index.jade', {
      locals: {
        title: 'Drop Node'
      }
    });
  });

  app.get('/about', function(req, res){
    res.render('about.jade', {
      locals: {
        title: 'Drop Node'
      } 
    });
  });
  app.get('/browsers', function(req, res){
    res.render('supported.jade', {
      locals: {
        title: 'DropNode: Supported Browsers'
      } 
    });
  });
  var shorten = function(url, callback){
    bitly.shorten(url, callback);
  };

  app.get("/shorten/:token", function(req, res){
    var token = req.params.token;
    shorten(token, function(err, result) {
     res.send(result);
    });
  });


  app.get("/preview/:token", function(req, res){
    var token = req.params.token
    var resource = resourceManager.getResource(token)
    if (typeof(resource) == "undefined"){
      common.gone(token, res);
      return
    }
    res.render('preview.jade', {
      locals: {
        title: 'Download',
        resource: {
          name: resource.name,
          size: resource.size,
          sizeDisplay: resource.sizeDisplay,
          type: resource.type,
          url: resource.url
        }
      } 
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
}
