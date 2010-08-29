var fs = require('fs'),
  qn = require('quasinumeric'),
  prng = qn.KISS07().uint32,
  common = require('common');

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
      self.handleWSRequest(conn, message);
    });
  });

  server.addListener('close', function(conn) {
    self.purgeConnection(conn);
  });
}

var serialLimit = 0x10000;
var radix = 62;                 // digits: [0-9a-zA-Z]

ResourceManager.CONTEXT = 'file';

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

/*
 * Handles a WebSocket request
 */
ResourceManager.prototype.handleWSRequest = function(conn, msg) {
  req = JSON.parse(msg);
  if ('share-file' == req['request']) {
    var r = new Resource(conn, this.baseURL, this.newToken(),
                         req['name'], req['size'], req['type']);
    this.resources.push(r);
    console.log('resources: ' + r);
    conn.send(JSON.stringify({'response' : 'ok',
                              'name' : r.name,
                              'url' : r.url, 
                              'sizeDisplay': r.sizeDisplay}));
  } else if ('sending' == req['response']) {
    console.log('sharer acknowledged request for ' + req['url']);
    // TODO: there should be a timeout that is canceled by this
  } else {
    // TODO:
    //   revoke -> remove resource from registry
    //   shutdown -> remove all associated resources
    console.log('unrecognized WebSockets request ' + msg);
  }
}

ResourceManager.prototype.handleHttpGet = function(token, response) {
  var r = this.getResource(token);
  if (r == undefined) {
    common.gone(token, response)
    return;
  } else {
    r.pending.push(response);
    r.wsconn.send(JSON.stringify({'request' : 'get',
				  'name' : r.name,
                                  'url' : r.url}));
    // TODO: set timeout for websocket response?
  }
}


ResourceManager.prototype.handleHttpPut = function(token, body, response) {
  var r = this.getResource(token);
  // TODO: appropriate response if no resource exists?
  if (r == undefined) {
    response.send(200);
    return;
  } else {
    var content= new Buffer(body, 'base64');
    while (r.pending.length > 0) {
      var gr = r.pending.pop();
      gr.attachment(r.name);
      gr.send(content, {'Content-Type' : r.type});
    }
    response.send(200);
  }
}
   
/*
 * Drops all resources associated with the given connection
 */
ResourceManager.prototype.purgeConnection = function(conn) {
  console.log('purging connection ' + conn.id);
  this.resources = this.resources.filter(function(r) {
    console.log('comparing to ' + r.wsconn.id);
    return r.wsconn != conn;
  });
}

/*
 * Gets the resource for the given token.
 */
ResourceManager.prototype.getResource = function(token) {
  var rs = this.resources.filter(function(r) { return r.token == token; });
  switch (rs.length) {
  case 0: return undefined;
  case 1: return rs[0];
  default:
    console.log('WARNING: multiple resources for ' + url);
    return rs[0];
  }
}


function Resource(wsconn, base, token, name, size, type) {
  var self = this;
  this.wsconn = wsconn;
  this.url = base + ResourceManager.CONTEXT + '/' + token;
  this.token = token;
  this.name = name;
  this.size = size;
  this.type = type;
  this.pending = [];

  function niceBytes(bytes){
    var units = ["bytes", "KB", "MB", "GB", "TB"];
    function fn(size, pow) {
      var scaled = size / Math.pow(1024, pow);
      if (scaled >= 1.0){
        return fn(size, pow+1);
      } else {
        return Math.round(scaled*1024*10)/10 + " " + units[pow-1];
      }
    }
    return fn(bytes, 0);
  }
  this.sizeDisplay = niceBytes(size);
}

Resource.prototype.toString = function() {
  return this.name + ':' + this.type + ' as ' + this.url +
    ' via ' + this.wsconn;
}


