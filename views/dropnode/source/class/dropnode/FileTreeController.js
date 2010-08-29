/* ************************************************************************

#asset(dropnode/*)

************************************************************************ */

qx.Class.define("dropnode.FileTreeController",
{
  type : 'singleton',
  extend : dropnode.Controller,
  properties : {
    currentSelection : {
      nullable : true
    },
    name : {
      nullable : true
    },
    fileId : {
      nullable : true
    },
    nodeId : {
      nullable : true
    },
    fileMap :{
      nullable : true
    }
  },
  members : {
    initialize : function (x){
      arguments.callee.base.apply(this, arguments);
      this.setFileMap(new Array());
      dropnode.Utilities.withMockReq({"service" : "allfiles"},
                                      dropnode.Utilities.makeCallback(this._create_data_model, this),
                                      dropnode.Utilities.makeCallback(this.error, this),
                                      dropnode.TestUsers.shared_files);
    },
    error : function (error) {
      this.getParent().error(error);
    },
    _create_data_model : function (indexed) {
      var dataModel = this.getUi().getFile_tree().getDataModel();
      var len = indexed.length;
      for (var i = 0; i<len ; i++) {
        var id = indexed[i].encodedName;
        var recipients = indexed[i].recipients;
        var fileNode = dataModel.addBranch(null,indexed[i].name,false);
        dataModel.setColumnData(fileNode,1,indexed[i].url);
        dataModel.setColumnData(fileNode,2,indexed[i].recipients.length);
        this.getFileMap()[id] = indexed[i];
        for (var j = 0; j< recipients.length; j++) {
          var recipientNode = dataModel.addLeaf(fileNode,
                                                indexed[i].recipients[j].progress);
        }
      }
      dataModel.setData();
    }
  }
});
