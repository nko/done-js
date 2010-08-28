var http = require('http'),
    querystring = require('querystring');

var API_KEY = "R_662058d252606f03a5dc03aad930d7ec";
var API_USER = 'donejs';
var API_HOST = 'api.bit.ly';
var API_PATH = '/v3/shorten';

/**
 * Shorten the target URL via bitly.  Once bitly responds,
 * the callback will be called with the shortened URL as the
 * second parameter to the callback.
 */
var shorten = function(target, callback) {
  var bitly = http.createClient(80, API_HOST);
  var apiUrl = API_PATH + '?' + querystring.stringify({
    'login': API_USER,
    'apiKey': API_KEY,
    'longUrl': target
  });
  var request = bitly.request('GET', apiUrl,
                               {'host': API_HOST});
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