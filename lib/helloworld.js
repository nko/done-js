// this can go away, for demo purposes

function HelloWorld(greeting){
  this.greet = function(greetee, cb){
    if(cb){
      process.nextTick(function(){ // example of async "do it yourself"
        cb(null, greeting + " " + greetee)
      })
    }else{
      return greeting + " " + greetee
    }
  }
  
}

exports.HelloWorld = HelloWorld
