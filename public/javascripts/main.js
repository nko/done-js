$(function(){
    handleDragAndDrop($('#dropbox').get(0))
})

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

