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
    }
  },
  members : {
    map : [],
    url : null,
    initialize : function (x){
      arguments.callee.base.apply(this, arguments);
      dropnode.Utilities.withMockReq({"request" : "allfiles"},
                                      dropnode.Utilities.makeCallback(this._create_data_model, this),
                                      dropnode.Utilities.makeCallback(this.error, this),
                                      dropnode.TestUsers.shared_files);
    },
    error : function (error) {
      this.getParent().error(error);
    },
    _create_data_model : function (indexed) {
      this._to_url_map(indexed);
      var dataModel = this.getUi().getFile_tree().getDataModel();
      var len = indexed.length;
      for (var i = 0; i<len ; i++) {
        var id = indexed[i].encodedName;
        var recipients = indexed[i].recipients;
        var fileNode = dataModel.addBranch(null,indexed[i].name,false);
        dataModel.setColumnData(fileNode,1,indexed[i].url);
        dataModel.setColumnData(fileNode,2,indexed[i].recipients.length);
        for (var j = 0; j< recipients.length; j++) {
          var recipientNode = dataModel.addLeaf(fileNode,"", null,null);
          dataModel.setColumnData(recipientNode,1,this.ascii_progress_bar(100,recipients[j].progress,40) + " " + recipients[j].progress + "%");
        }
      }
      dataModel.setData();
    },

    _to_url_map : function (indexed) {
      var _url = {};
      for (var i = 0; i < indexed.length; i++) {
        _url[indexed[i].url] = indexed[i];
      }
      this.map = _url;
    },

    ascii_progress_bar : function (num_items, num_completed, width) {
      var percent_completed = num_completed/num_items;
      var num_chars = Math.floor(percent_completed * width);
      var progress_bar = "[";
      for (var i = 0; i < width; i++) {
          if (i <= num_chars && num_chars != 0) {
            progress_bar = progress_bar + "*";
          }

        else {
          progress_bar = progress_bar + "-";
        }
      }
      progress_bar = progress_bar + "]";
      return progress_bar;
    },

    _addListeners: function () {
      this.getUi().getFile_tree().addListener("changeSelection", function (e){
                                                var resp = e.getData()[0];
                                                this.setNodeId(resp.nodeId);
                                                if (resp.type == 2) {
                                                  this.url = resp.columnData[1];
                                                }
                                                else if (resp.type == 1) {
                                                  this.url = this.getUi().getFile_tree().nodeGet(resp.parentNodeId).columnData[1];
                                                }
                                             },this);
    },
    _addReactors : function () {
      this._subscribe("details", this._relay_details, this);
      this._subscribe("delete", this._relay_delete, this);
    },

    // _relay_details : function (){
    //   this._dispatch("fileTree.details",this.map()[this.getUrl()]);
    // },
    _relay_delete: function () {
      this._dispatch("fileTree.delete",this.map[this.url]);
    },
    _addBindings : function () {
//      this.bind("message", this.getUi().getMessage(), "value");
    },

    _is_branch : function (nodeId) {
      var type = this.getUi().getFile_tree().nodeGet(nodeId).type;
      if (type == qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH) {
        return true;
      }
      else return false;
    },

    _is_leaf : function (nodeId) {
      if (!(this.is_branch(nodeId))) {
        return true;
      }
      else return false;
    },


    testProgressive : function () {
      var nextId = 0;
      var rowData = [];
      for (var row = 0; row < 50; row++) {
        rowData.push({
                       renderer : "func",
                       data: function() {
                         return null;
                       }
                     });
      }

      var columnWidths = new qx.ui.progressive.renderer.table.Widths(1);
      columnWidths.setWidth(0, "100%");

      // Instantiate a Progressive
      var footer = new qx.ui.progressive.headfoot.Progress(columnWidths);
      var structure = new qx.ui.progressive.structure.Default(null, footer);
      var progressive = new qx.ui.progressive.Progressive(structure);

      // Instantiate a data model and populate it.
      var dataModel = new qx.ui.progressive.model.Default();

      dataModel.addElements(rowData);
      // Tell Progressive about its data model
      progressive.setDataModel(dataModel);

      // Instantiate a Function Caller
      var functionCaller = new qx.ui.progressive.renderer.FunctionCaller();

      // Give Progressive the renderer, and assign a name
      progressive.addRenderer("func", functionCaller);

      progressive.set(
        {
          height          : 10,
          width           : 200,
          zIndex          : 99999,
          backgroundColor : "gray",
          opacity         : 0.86,
          batchSize       : 1
        });
      return progressive;
    }
  }
});
