/* ********************************************************
#asset(qx/icon/${qx.icontheme}/22/actions/list-remove.png)
#asset(qx/icon/${qx.icontheme}/22/status/dialog-information.png)
********************************************************** */
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
    },
    name : {
      nullable :true
    },
    type : {
      nullable : true
    }
  },
  members : {
    initialize : function (event_bus) {
      this.setEvent_bus(event_bus);
    },
    _addBindings : function () {
      arguments.callee.base.apply(this, arguments);
      this.bind("name", this.getUi().getName(), "value");
      this.bind("type", this.getUi().getType(), "value");
    },
    init_gui : function () {
      this.setBase_container(new qx.ui.container.Composite(new qx.ui.layout.VBox()));
      var toolbar = new qx.ui.toolbar.ToolBar();
      var show_details = new qx.ui.toolbar.Button("Show Details","icon/22/status/dialog-information.png");
      var delete_button = new qx.ui.toolbar.Button("Delete","icon/22/actions/list-remove.png");
      toolbar.add(show_details);
      toolbar.add(delete_button);
      show_details.addListener("execute", function (e) {
                                 this.getEvent_bus().getInstance().dispatch(new qx.event.message.Message("details", null));
                               },this);
      delete_button.addListener("execute", function (e) {
                                  this.getEvent_bus().getInstance().dispatch(new qx.event.message.Message("delete", null));
                               },this);
      this.setFile_tree(new qx.ui.treevirtual.TreeVirtual(["File Name", "URL", "Downloads"]));
      this.getFile_tree().setFocusCellOnMouseMove(false);
      this.getBase_container().add(toolbar);
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
