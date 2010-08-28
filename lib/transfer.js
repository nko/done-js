/**
 * Global list of current tokens
 */
var TOKENS = {};
exports.TOKENS = TOKENS; // for testing

/**
 * Object for coordinating communication between sharer and receiver
 */
var Channel = function(filename) {
  this.filename = filename;
  this.listeners = new Array();

  this.addListener = function(response) {
    this.listeners.push(response);
  }

  this.removeListener = function(index) {
    this.listeners.splice(index, 1);
  }
}
exports.Channel = Channel;

var putFile = function(token, data, response){
  // ensure the token exists
  if (!tokenExists(token, response)) {
    return;
  }

  var channel = TOKENS[token];
  for (i in channel.listeners) {
    // grab the client's response object and quickly remove it from this list 
    // of waiting listeners
    client = channel.listeners[i];
    channel.removeListener(i);

    // start streaming the file as an attachment
    client.attachment(channel.filename);
    client.send(data);
  }

  // ack back to the sharer
  response.send(200);
};
exports.putFile = putFile;

var getFile = function(token, response){
  // ensure the token exists
  if (!tokenExists(token, response)) {
    return;
  }

  channel = TOKENS[token];
  channel.addListener(response);
};
exports.getFile = getFile;


/**
 * Make sure the token exists, if not, 404 the response
 * and return false.
 */
var tokenExists = function(token, response) {
  if (!(token in TOKENS)) {
    response.send(404);
    return false;
  }
  return true;
}

