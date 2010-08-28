require.paths.unshift(__dirname+"/../lib")

var vows = require('vows'),
    assert = require('assert'),
    transfer = require('transfer');


var FakeResponse = function(){
  this._send_args = new Array();
  this.send = function(){
    this._send_args = arguments;
  };

  this._attachment_args = new Array();
  this.attachment = function(){
    this._attachment_args = arguments;
  }
};

// teardown any data in transfer.TOKENS
var clearTokens = function(){
  for (token in transfer.TOKENS) {
    delete transfer.TOKENS[token];
  }
}

vows.describe('transfer').addBatch({
  'GET not-existent token':{
    topic:function(){
      var response = new FakeResponse();
      transfer.getFile("abc123", response);
      return response;
    },
    'should 404':function(err, result){
      assert.equal(result._send_args[0], 404)
    }
  },
  'GET token':{
    topic:function(){
      var token = "abc123";
      var channel = new transfer.Channel()
      transfer.TOKENS[token] = channel;
      var response = new FakeResponse();
      
      transfer.getFile(token, response);

      // teardown
      clearTokens();

      return {response: response, channel: channel};
    },
    'should add a listener':function(err, result){
      assert.equal(result.channel.listeners.length, 1);
      assert.equal(result.channel.listeners[0], result.response);
    }
  },
  'multiple clients GET token':{
    topic:function(){
      var token = "abc123";
      var channel = new transfer.Channel();
      transfer.TOKENS[token] = channel;

      transfer.getFile(token, new FakeResponse());
      transfer.getFile(token, new FakeResponse());
      transfer.getFile(token, new FakeResponse());
      transfer.getFile(token, new FakeResponse());

      // teardown
      clearTokens();

      return channel;
    },
    'should add four listeners':function(err, result){
      var channel = result;
      assert.equal(channel.listeners.length, 4);
    }
  },
  'PUT file to non-existent token':{
    topic:function(){
      var response = new FakeResponse();
      
      transfer.putFile( "abc123", "", response);
      return response;
    },
    'should 404':function(err, result){
      assert.equal(result._send_args[0], 404);
    }
  },
  'PUT file to token':{
    topic:function(){
      var token = "abc123";
      var channel = new transfer.Channel("hello.pdf");
      transfer.TOKENS[token] = channel;
      var clientResponse = new FakeResponse();
      channel.addListener(clientResponse);
      var sharerResponse = new FakeResponse();

      transfer.putFile(token, "hello world", sharerResponse);

      // teardown
      clearTokens();
      
      return {
        channel: channel, 
        clientResponse: clientResponse, 
        sharerResponse: sharerResponse
      };
    },
    'should send data to client':function(err, result){
      assert.equal(result.clientResponse._send_args[0], "hello world");
    },
    'should send as attachment':function(err, result){
      assert.equal(result.clientResponse._attachment_args[0], "hello.pdf");
    },
    'should remove listener':function(err, result){
      assert.equal(result.channel.listeners.length, 0);
    },
    'should return 200':function(err, result){
      assert.equal(result.sharerResponse._send_args[0], 200);
    }
  }
}).export(module)
