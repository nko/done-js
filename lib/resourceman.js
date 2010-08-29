var qn = require('./quasinumeric'),
  prng = qn.KISS07().uint32;

var ResourceManager = exports = module.exports = function(server, url) {
  var self = this;
  this.server = server;
  this.serial = 0;
  this.baseURL = url;
  this.resources = [];

  console.log('ResourceManager starting for ' + url);

  server.addListener('connection', function(conn) {
    console.log('new connection ' + conn.id);
    conn.addListener('message', function(message) {
      self.handleRequest(conn, message);
    });
  });
}

var serialLimit = 0x10000;
var radix = 62;                 // digits: [0-9a-zA-Z]

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

ResourceManager.prototype.handleRequest = function(conn, msg) {
  req = JSON.parse(msg);
  switch (req['request']) {
  case 'share-file':
    var r = new Resource(this.newURL(),
                         req['name'], req['size'], req['type']);
    this.resources.push(r);
    conn.send(JSON.stringify({'response' : 'ok',
                              'name' : r.name,
                              'url' : r.url}));
    break;
    
    // TODO:
    //   revoke -> remove resource from registry
    //   shutdown -> remove all associated resources
    
  default:
    console.log('unrecognized websockets request ' + req.request);
    break;
  }
}

ResourceManager.prototype.newURL = function() {
  return this.baseURL + "d/" + this.newToken();
}


function Resource(url, name, size, type) {
  var self = this;
  this.url = url;
  this.name = name;
  this.size = size;
  this.type = type;
}

