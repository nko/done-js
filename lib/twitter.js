var OAuth= require('oauth').OAuth;

// secret credentials for the donejs app and user
var credentials = {
  consumerKey: 'CtnW8VEyOmQgAPaneG7LEg',
  consumerSecret: 'NShimerdjQGNSkKnug3xmdRFB7Ph2AOofOwRW1zYI',
  accessToken: '184072309-cqQy93sPURhI2ITlQDyhxvGPovjrDIDdlI1IAIrh',
  accessTokenSecret: '90Z0nAIEy37OdJ03hUIzrYARDdX7yjMHaMNtCti6ZG4',
}

var oAuth = new OAuth("http://twitter.com/oauth/request_token",
                      "http://twitter.com/oauth/access_token",
                      credentials.consumerKey,  credentials.consumerSecret,
                      "1.0A", null, "HMAC-SHA1");

/** 
 * Twitter direct message a screen name. Requires that user to be following
 * donejs.  Message must be under 140 character limit.
 */
var dm = function(screen_name, message, callback) {
  oAuth.post("http://api.twitter.com/1/direct_messages/new.json",
             credentials.accessToken,
             credentials.accessTokenSecret,
             {
               "screen_name": screen_name,
               "text": message
             }, 
             function(error, result) {
               console.log("twitter dm to " + screen_name + ": " + message);
               if (error) {
                 console.log(require('sys').inspect(error));
               }
               callback(error, result)
             }
            );
};
exports.dm = dm;
