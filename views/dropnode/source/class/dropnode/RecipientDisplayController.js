qx.Class.define("dropnode.RecipientDisplayController",
{
  extend : dropnode.Controller,
  type : 'singleton',
  properties : {
    file_name : {
      init : ""
    },
    name : {
      init : ""
    },
    file_id :{
      init : ""
    },
    progress : {
      init : -1
    },
    url : {
      init : ""
    }
  },
  members : {
    _processMessage : function () {
      if (this.getMessage() == "delete") {
        this._dispatch("recipientDelete", {name : this.getName()});
      }
    },
    error : function (error){
      this.getParent().error(error);
    },
    _addReactors : function () {
      this._subscribe("file_tree.selectionChanged", this._selectionChanged , this);
    },
    _selectionChanged: function (message) {
      if (message.type == "LEAF") {
        this.setName(message.name);
        this.setFile_name(message.file_name);
        this.setFile_id(message.file_id);
        this.setProgress(message.progress);
        this.setUrl(message.url);
      }
    }
  }
});
