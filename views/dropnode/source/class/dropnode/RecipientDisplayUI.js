qx.Class.define("dropnode.RecipientDisplayUI",
{
  extend : qx.core.Object,
  properties : {
    file_name : {
      nullable : true
    },
    name : {
      init : ""
    },
    file_id : {
      nullable : true
    },
    progress : {
      nullable : true
    },
    recipient_view_container : {
      nullable : true
    },
    url : {
      nullable : true
    },
    event_bus :{
      nullable : true
    },
    base_container : {
      nullable : true
    },
    message : {
      nullable : true
    }
  },
  members : {
    initialize : function (event_bus) {
      this.setEvent_bus(event_bus);
    },
    init_gui : function () {
      this.setBase_container(new qx.ui.container.Composite(new qx.ui.layout.VBox()));
      this.getBase_container().setPadding(4,4,4,4);
      this.setRecipient_view_container(new qx.ui.container.Composite(new qx.ui.layout.VBox(2)));

      var recipient_container = new qx.ui.container.Composite(new qx.ui.layout.Grid());
      recipient_container.setPaddingLeft(6);
      recipient_container.setBackgroundColor(qx.util.ColorUtil.rgbToRgbString([255,255,234]));

      var name_container = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      name_container.setPaddingLeft(6);
      name_container.setBackgroundColor(qx.util.ColorUtil.rgbToRgbString([255,255,234]));

      var delete_button = new qx.ui.form.Button("Delete");
      delete_button.addListener("execute", function (e) {
                                  this.setMessage("");
                                  this.setMessage("delete");
                                },this);

      name_container.add(new qx.ui.basic.Label(this.getName()));
      name_container.add(new qx.ui.core.Spacer, {flex : 1});
      name_container.add(delete_button);

      recipient_container.add(new qx.ui.basic.Label("Name :" ), {row: 0, column: 0});
      recipient_container.add(new qx.ui.basic.Label(this.getFile_name()), {row: 0, column: 1});
      recipient_container.add(new qx.ui.basic.Label("Url :" ), {row: 1, column: 0});
      recipient_container.add(new qx.ui.basic.Label(this.getUrl()), {row: 1, column: 1});
      recipient_container.add(new qx.ui.basic.Label("Progress :"), {row: 2, column: 0});
      recipient_container.add(new qx.ui.basic.Label(this.getProgress()), {row: 2, column: 1});

      this.getRecipient_view_container().add(name_container);
      this.getRecipient_view_container().add(recipient_container);

      this.getBase_container().add(this.getRecipient_view_container());
    }
  }
});
