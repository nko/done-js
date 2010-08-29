var http = require('http'),
  querystring = require('querystring'),
  settings = require('config').settings;

/**
 * Shorten the target URL via bitly.  Once bitly responds,
 * the callback will be called with the shortened URL as the
 * second parameter to the callback.
 */
var shorten = function(target, callback) {
  var bitly = http.createClient(80, settings.bitly.host);
  var apiUrl = settings.bitly.path + '?' + querystring.stringify({
    'login': settings.bitly.user,
    'apiKey': settings.bitly.key,
    'longUrl': target
  });
  var request = bitly.request('GET', apiUrl,
                               {'host': settings.bitly.host});
  request.end();
  request.on('response', function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      // TODO error handling
      var url = JSON.parse(chunk).data.url;
      console.log("shortened url from " + target + " to " + url);
      callback(null, url);
    });
  });
};
exports.shorten = shorten;