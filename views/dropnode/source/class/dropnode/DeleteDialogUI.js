qx.Class.define("dropnode.DeleteDialogUI",
{
  extend : qx.core.Object,
  properties : {
    ok : {
      nullable : true
    },
    cancel : {
      nullable : true
    },
    name : {
      nullable :true,
      event : "nameChanged"
    },
    type : {
      nullable : true
    },
    base_container : {
      nullable : true
    },
    event_bus : {
      nullable: true
    }
  },
  members : {
    nameChanged : function () {
      this.debug("Name changed to " + this.getName());
    },
    initialize : function (event_bus) {
      this.setEvent_bus(event_bus);
    },

    init_gui : function () {
      var win = new qx.ui.window.Window("Delete");
      win.setLayout(new qx.ui.layout.VBox());
      win.setShowStatusbar(false);
      win.setEnabled(true);
      win.setModal(true);
      win.setMovable(false);
      win.setShowClose(false);
      win.setShowMaximize(false);
      win.setShowMinimize(false);
      win.add(this.dialog());

      this.setBase_container(win);

      this.getOk().addListener("execute", function (e) {this.getBase_container().close();}, this);
      this.getCancel().addListener("execute", function (e) {this.getBase_container().close();},this);
    },

    open : function () {
      this.getBase_container().center();
      this.getBase_container().open();
    },

    dialog : function () {
      var vbox = new qx.ui.layout.VBox();
      var dialog_base = new qx.ui.container.Composite(vbox);
      vbox.setSpacing(4);

      var button_bar = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      this.setOk(new qx.ui.form.Button("Delete"));
      this.setCancel(new qx.ui.form.Button("Cancel"));
      button_bar.add(this.getOk());
      button_bar.add(this.getCancel());

      var label = new qx.ui.basic.Label();
      this.addListener("nameChanged", function (e) {
                         label.setValue("Are you sure you want to delete " + this.getName() + "?");
                       });

      dialog_base.add(label);
      dialog_base.add(button_bar);
      return dialog_base;
    }
  }
});
