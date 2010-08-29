$(function(){
  wsConnect('ws://'+location.hostname+':3081');
  handleDragAndDrop($('#dropbox').get(0))
  $('#shortenedUrlDisplay').click(function(){
    $(this).select()
  })
  $("#twitterDMButton").click(function(){
    tweetToken("abc"); //TODO dynamically create this
  });
  $("#shareDialog").dialog(
    {  width: 400,
       height: 160,
       modal: true,
       autoOpen: false,
       position: ['center', 20]
    });

  warnOnUnload();
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
    $('body').trigger('uploadfile', [files]);
    
    $('#step2').text("Shared " + files[0].name + " of type " + files[0].type+"!")
    setTimeout(function(){
      $('#step2').fadeOut(4000, function(){
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
  $.get(url, function(data) {
    $("#shortenedUrlDisplay").val(data);
    $("#shareDialog").dialog('open');
  });
}

function warnOnUnload(){
  var uploadedFiles = []
  $('body').bind('uploadfile', function(e, files){
    for(var i = 0; i < files.length; i++){
      // loop append, instead of using concat to ensure that uploadedFiles is the same object
      uploadedFiles.push(files[i]);
    }
  });

  var message = function(){
    if (uploadedFiles.length > 0) {
      var files = (uploadedFiles.length == 1) ? "file" : "files";
      var theseFiles = (uploadedFiles.length == 1) ? "this file" : "these files";
      return "Navigating away from this page will end sharing of " + uploadedFiles.length + " " + files + ".  Any links you shared to " + theseFiles + " will stop working.";
    }
    // empty return does not trigger beforeunload message
  };

  $(window).bind('beforeunload', function(){ 
    return message();
  });
}

