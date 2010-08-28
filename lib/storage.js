var Connection = require('cradle').Connection


function Strorage(host, dbname){
  var db = new Connection(host).database(dbname)
  
}
