/**
 * Global list of current tokens
 */
var TOKENS = {};
exports.TOKENS = TOKENS; // for testing

/**
 * Object for coordinating communication between sharer and receiver
 */
var Channel = function(token) {
  this.token = token;
  this.listeners = new Array();

  this.addListener = function(response) {
    this.listeners.push(response);
  }
}
exports.Channel = Channel;

var sendMeFile = function(token, res) {
  return function(data){
    res.attachment('something.dat');
    res.send(data);
  };
};

var obtainFile = function(callback){
  callback(data);
};

var putFile = function(token, request){
  // search for waiting clients
  
};
exports.putFile = putFile;

var getFile = function(token, response){
  // ensure the token exists
  if (!(token in TOKENS)) {
    response.send(404);
    return;
  }
  channel = TOKENS[token];
  channel.addListener(response);
};
exports.getFile = getFile;

var availableFile = function(){};
var command = function(){};