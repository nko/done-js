function wsConnect(wsurl) {
  console.log('Opening socket to ' + wsurl);
  var socket = new WebSocket(wsurl);
  socket.onopen = function() {
    console.log('Socket open to ' + wsurl );

/*
    var sharemsg = { 'request' : 'share-file',
		     'name' : 'my-file.txt',
		     'size' : '128',
		     'type' : 'application/text'
		   };
    socket.send(JSON.stringify(sharemsg));
    */
  };
  socket.onmessage = function(msg) {
    console.log('Received: ' + msg.data);
  }
  
  $('body').bind('uploadfile', function(e, files){
    for(var i = 0; i < files.length; i++){
      var request = files[i];
      request.request = 'share-file'
      socket.send(JSON.stringify(request))      
    }
  })
}
