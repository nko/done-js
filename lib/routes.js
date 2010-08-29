var  transfer = require('transfer'),
  bitly = require('bitly'),
  twitter = require('twitter');
  
exports.wire = function(app, settings){
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

  var shorten = function(token, callback){
    var url = settings.baseUrl + "file/" + token;
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
}
