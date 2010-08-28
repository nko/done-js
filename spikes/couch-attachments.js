/**
 * Damn dirty spiek to se ehow attachments work 
 */
var cradle = require('../vendor/cradle'),
    fs = require('fs'),
    sys = require('sys')

var db = new cradle.Connection("donejs.couchone.com").database("scratch")

if(process.argv[2] == 'save'){
  fs.readFile('scala-gedit.png', 'base64', function(err, data){
    db.insert('MyToken', {
      _attachments:{
        'scala.png':{
          'content_type':'image/png',
          data:data
        }
      }
    }, function(err, result){
      console.log('saved it, go look at http://donjs.couchone.com/_utils')
    })
  })
}

if(process.argv[2] == 'remove'){
  db.get('MyToken', function(err, result){
    db.remove(result._id, result._rev, function(err, result){
      console.log("Deleted...")
    })
  })
}

if(process.argv[2] == 'getfile'){
  db.get('MyToken', {attachments: true}, function(err, result){
      sys.puts(sys.inspect(result))
  })    
}

if(process.argv[2] == 'getnofile'){
  db.get('MyToken', function(err, result){
      console.log(sys.inspect(result))
  })    
}
