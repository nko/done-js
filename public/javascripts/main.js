$(function(){
  handleDragAndDrop($('#dropbox').get(0))

  $("#shareButton").click(function(){
    shortenUrl("abc"); //TODO dynamically create this
    $("#shareDialog").dialog('open');
  });
  $('#connectButton').click(function() {
    wsConnect('ws://localhost:3081');
  });
  $("#twitterDMButton").click(function(){
    tweetToken("abc"); //TODO dynamically create this
  });
  $("#shareDialog").dialog(
   {
      height: 140,
      modal: true,
      autoOpen: false
    });
})

function handleDragAndDrop(dropbox){
  document.addEventListener('drop', noop, false);
  document.addEventListener('dragenter', function(e){
    $('#step1').removeClass('active')
    $('#step2').addClass('active')
    noop.apply(this, arguments)
  }, false);
  document.addEventListener('dragexit', function(e){
    $('#step2').removeClass('active')
    $('#step1').addClass('active')
    noop.apply(this, arguments)
  }, false)

  var drop = function(e){
    noop.apply(this, arguments)
    var files = e.dataTransfer.files
    $('#step2').text("Shared " + files[0].name + " of type " + files[0].type+"!")
    setTimeout(function(){
      $('#step2').fadeOut(2000, function(){
        $('#step2')
          .removeClass('active')
          .text('2. Drop File(s) Here')
          .fadeIn(2000)
        $('#step1').addClass('active')
        
      })
    }, 2000)
  }
  

 dropbox.addEventListener("drop", drop, false);
 dropbox.addEventListener("dragexit", noop, false);
 dropbox.addEventListener("dragover", noop, false);
 dropbox.addEventListener("dragenter", function(e){
   $('#step2').text('3. DROP!')
   e.stopPropagation();
   e.preventDefault();
 }, false);
}

function noop(e) {
  e.stopPropagation();
  e.preventDefault();
}

function tweetToken(token){
  var handle = $("#twitterHandle");
  // verify that they entered something
  if ($.trim(handle.val()).length == 0) {
    return
  }
  var url = '/tweet/' + token;
  $.ajax({
    url: url,
    type: 'POST',
    data: {'handle': handle.val()},
    success: function(){
      $("#shareDialog").dialog('close');
      // clear out the username
      handle.val("");
    },
    error: function(request, status, error){
      //$("#shareDialog").dialog('open');
      handle.effect("highlight", {color: 'red'}, 3000);
    }
  });
}

function shortenUrl(token){
  var url = '/shorten/' + token;
  var callback = function(data) {
    $("#shortenedUrlDisplay").val(data);
 
  };
  $.get(url, callback);
}

// Trivial example of WebSocket connection
function wsConnect(wsurl) {
  console.log('Opening socket to ' + wsurl);
  var socket = new WebSocket(wsurl);
  socket.onopen = function() {
    console.log('Socket open to ' + wsurl + '; sending share request');

    var sharemsg = { 'request' : 'share-file',
		     'name' : 'my-file.txt',
		     'size' : '128',
		     'type' : 'application/text'
		   };
    socket.send(JSON.stringify(sharemsg));
  };
  socket.onmessage = function(msg) {
    console.log('Received: ' + msg.data);
  }


  socket
}
