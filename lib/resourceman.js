var qn = require('./quasinumeric'),
  prng = qn.KISS07().uint32;

var ResourceManager = exports = module.exports = function(server, url) {
  var self = this;
  this.server = server;
  this.serial = 0;
  this.baseURL = url;

  console.log('ResourceManager starting for ' + url);

  server.addListener('connection', function(conn) {
    console.log('new connection ' + conn.id);
    conn.addListener('message', function(message) {
      self.handleRequest(message);
    });
    // TODO: better ACK or none
    conn.send(JSON.stringify({'request':'Hi there!'}));
  });
}

var serialLimit = 0x10000;
var radix = 62;									// digits: [0-9a-zA-Z]

/*
 * Generates a new token of 1-9 alphanumeric characters by
 * concatenating a 16-bit incrementing serial number onto a
 * 32-bit random integer, then expressing the 48-bit quantity
 * in base 62. These should be both hard to guess and extremely
 * unlikely to repeat on reasonable time scales.
 */
ResourceManager.prototype.newToken = function() {
  this.serial = (this.serial + 1) % serialLimit;
  return qn.toRadix(prng() * serialLimit + this.serial, radix);
}

ResourceManager.prototype.handleRequest = function(conn) {
  conn.addListener("message", function(msg) {
    req = JSON.parse(msg);
    switch (req['request']) {
    case 'share-file':
      console.log('unimplemented operation: share-file');
      // TODO: add new entry to table
      // return URL
      break;

      // TODO:
      //   revoke -> remove resource from registry
      //   shutdown -> remove all associated resources

    default:
      console.log('unrecognized websockets request ' + req.request);
      break;
    }
  });
}
