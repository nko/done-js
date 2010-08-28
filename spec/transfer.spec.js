require.paths.unshift(__dirname+"/../lib")

var vows = require('vows'),
    assert = require('assert'),
    transfer = require('transfer');


var FakeResponse = function(){
  this.send = function(){
    this._send_args = arguments;
  };
};

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
      var channel = new transfer.Channel(token)
      transfer.TOKENS[token] = channel;
      var response = new FakeResponse();
      
      transfer.getFile(token, response);
      return [response, channel];
    },
    'should add a listener':function(err, result){
      var response = result[0],
          channel = result[1];
      assert.equal(channel.listeners.length, 1);
      assert.equal(channel.listeners[0], response);
    }
  },
  'multiple clients GET token':{
    topic:function(){
      var token = "abc123";
      var channel = new transfer.Channel(token)
      transfer.TOKENS[token] = channel;

      transfer.getFile(token, new FakeResponse());
      transfer.getFile(token, new FakeResponse());
      transfer.getFile(token, new FakeResponse());
      transfer.getFile(token, new FakeResponse());

      return channel;
    },
    'should add four listeners':function(err, result){
      var channel = result;
      assert.equal(channel.listeners.length, 4);
    }
  }
}).export(module)
