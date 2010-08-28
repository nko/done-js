require.paths.unshift(__dirname+"/../lib")

var vows = require('vows'),
    assert = require('assert'),
    HelloWorld = require('helloworld').HelloWorld;

vows.describe('Hello World').addBatch({
  'Async Example':{
    topic:function(){
      var greeter = new HelloWorld("Howdy")
      greeter.greet("Dave", this.callback)
    },
    'should combine greeting and greetee':function(err, result){
      assert.equal(result, "Howdy Dave")
    }
  },
  'Sync example':{
    topic: function(){
      var greeter= new HelloWorld("Hello")
      return greeter.greet("World")
    },
    'should combine greeting and greetee':function(result){
      assert.equal(result, "Hello World")
    }
  }
}).export(module)
