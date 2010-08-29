qx.Class.define("dropnode.DeleteDialogController",
{
  extend : dropnode.Controller,
  type : 'singleton',
  properties : {
    name : {
      nullable : true,
      event : "changeName"
    },
    id : {
      nullable : true
    }
  },
  members : {
    _cancel : function () {
      this.debug ("delete cancelled");
    },
    _delete : function () {
//      this.debug("delete initiated");
      dropnode.Utilities.withReq({"request" : "delete",
                                  "type"    : this.getDelete_type(),
                                  "id"      : this.id()},
                                  dropnode.Utilities.makeCallback(this._notifyChange, this),
                                  dropnode.Utilities.makeCallback(this.error, this));
      this._notifyChange(null);
    },

    _fileDelete : function (msg) {
      this.setName(msg.name),
//      this.setId(msg.id),
      this.getUi().open();
    },
    _notifyChange : function (result) {
      this._dispatch("okDelete", {name : this.getName(), id : this.getId()});
    },
    _addReactors : function () {
      this._subscribe("fileTree.delete", this._fileDelete,this);
    },
    _addBindings : function () {
      arguments.callee.base.apply(this, arguments);
      this.bind("name", this.getUi(),"name");
    },
    _addListeners : function () {
      this.getUi().getOk().addListener("execute", function (e) {this._delete();}, this);
      this.getUi().getCancel().addListener("execute", function (e) {this._cancel();}, this);
    }
  }
});
