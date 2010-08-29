qx.Class.define("dropnode.FileTreeUI",
{
  extend : qx.core.Object,
  properties : {
    message : {
      nullable : true,
      event : "changeMessage"
    },
    file_tree : {
      nullable : true
    },
    base_container : {
      nullable : true
    },
    event_bus : {
      nullable : true
    }
  },
  members : {
    initialize : function (event_bus) {
      this.setEvent_bus(event_bus);
    },
    init_gui : function () {
      this.setBase_container(new qx.ui.container.Composite(new qx.ui.layout.VBox()));
      this.setFile_tree(new qx.ui.treevirtual.TreeVirtual(["File Name", "URL", "Downloads"]));
      this.getFile_tree().setFocusCellOnMouseMove(false);
      this.getBase_container().add(this.getFile_tree());
    },

    goToFocusedRow : function () {
      this.goToRow(this.getFile_tree().getFocusedRow());
    },
    goToRow : function (rowIndex) {
      // is the current focused row valid?
      var that = this;
      var isValid = function (r) {
        if (r >= 0) {
          if (that.getFile_tree().getDataModel().getRowCount() > 0) {
            if (r <= (that.getFile_tree().getDataModel().getRowCount() - 1)) {
              return true;
            }
            else return false;
          }
          else throw "Empty row count in tree";
        }
        else throw "Negative row index";
      };

      if (isValid(rowIndex)) {
        var focused_node = this.getFile_tree().getDataModel().getNodeFromRow(rowIndex);
        this.getFile_tree().getSelectionModel().setSelectionInterval(rowIndex,rowIndex);
      }
      else {
        this.goToRow(rowIndex - 1);
      }
    }
  }
});
