$(function(){
  handleDragAndDrop($('#dropbox').get(0))

  $("#shortenButton").click(function(){
    shortenUrl("abc"); //TODO dynamically create this
  });
  $("#shortenDialog").dialog(
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

function shortenUrl(token){
  var url = '/shorten/' + token;
  $("#shortenDialog").dialog('open');

  var callback = function(data) {
    $("#shortenedUrlDisplay").val(data);

  };
  $.get(url, callback);
}
