function wsConnect(wsurl) {
  var urls = {}
  var fileBuffer = {}
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
    var res = JSON.parse(msg.data);
    if(res.response && res.response == "ok"){
      var url = res.url.replace(/file/g, "preview");
      $("#emailUrl").attr("href", "mailto:?subject="+res.name+" on done-js.no.de&body=You can download "+res.name+" at "+url);
      $('#shortenedUrlDisplay').val(url)
      $("#shareDialog").dialog('open');
    }else if(res.request && res.request == 'get'){
      $('body').trigger('url-recvd', [res])
    }
  }
  
  $('body').bind('url-recvd', function(e, server){
    var file = fileBuffer[server.name]
    typeof FileReader != 'undefined'?
      (function(){
        var reader = new FileReader()
        reader.onload = function(e){ 
          console.log("PUT'ing to " + server.url)
          $.ajax({
            type: 'PUT',
            url: server.url,
            data: e.target.result,
            dataType: file.type,
            success:function(){
              console.log("data sent")
            }
          });
        }
        reader.readAsBinaryString(file)
      })()
      :
      (function(){
        alert('Your browser doesnt support FileReader.')
      })()
    
  });
  
  $('body').bind('uploadfile', function(e, files){
    for(var i = 0; i < files.length; i++){
      var request = files[i];
      fileBuffer[request.name] = request
      request.request = 'share-file'
      socket.send(JSON.stringify(request))      
    }
  })
}
