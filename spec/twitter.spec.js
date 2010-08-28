require.paths.unshift(__dirname+"/../lib")

var vows = require('vows'),
    assert = require('assert'),
    twitter = require('twitter');

vows.describe('Twitter').addBatch({
  'Direct Message':{
    topic:function(){
      twitter.dm("johnpaulett", "test direct message from donejs", this.callback);
    },
    'should contact twitter':function(err, result){
      assert.equal(JSON.parse(result).recipient_screen_name, "johnpaulett")
    }
  }
}).export(module)
