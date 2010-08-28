$(function(){
  featuresSupported({
    no:lockdown,
    yes:function(){handleDragAndDrop($('#dropbox').get(0))}
  })
})

function featuresSupported(cbs){
  cbs[typeof FileReader != 'undefined'?'yes':'no']()
}

function lockdown(){
  $('#content').html("<div id='no-support'><h3>Well Well Well...</h3><p>Looks like you'll need to upgrade your browser if you want to use this site. You'll need a webkit capable browser that supports HTML5's File API</p></div>")
}


function handleDragAndDrop(dropbox){
  var dragEnter = dragExit = dragOver = drop = function(e){
    e.stopPropagation();
    e.preventDefault();
  }

  var drop = function(e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files
    alert("Dropped " + files[0].name + " of type " + files[0].type)
  }
  
 dropbox.addEventListener("dragenter", dragEnter, false);
 dropbox.addEventListener("dragexit", dragExit, false);
 dropbox.addEventListener("dragover", dragOver, false);
 dropbox.addEventListener("drop", drop, false);
}

