require.paths.unshift(__dirname+"/../lib")

var vows = require('vows'),
    assert = require('assert'),
    bitly = require('bitly');

vows.describe('Bit.ly Shortener').addBatch({
  'shorten':{
    topic:function(){
      bitly.shorten("http://done-js.no.de/fake", this.callback)
    },
    'should provide small url':function(err, result){
      assert.equal(result, "http://bit.ly/9nRRjw")
    }
  }
}).export(module)
