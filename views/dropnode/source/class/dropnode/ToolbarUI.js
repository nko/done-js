/* ********************************************************
#asset(qx/icon/${qx.icontheme}/22/actions/list-remove.png)
#asset(qx/icon/${qx.icontheme}/22/status/dialog-information.png)
********************************************************** */

qx.Class.define("dropnode.ToolbarUI",
{
  extend : qx.core.Object,
  properties : {
    message : {
      nullable : true,
      event : "changeMessage"
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
    init_gui : function() {
      this.setBase_container(new qx.ui.toolbar.ToolBar());
      var show_details = new qx.ui.toolbar.Button("Show Details","icon/22/status/dialog-information.png");
      var delete_button = new qx.ui.toolbar.Button("Delete","icon/22/actions/list-remove.png");
      this.getBase_container().add(show_details);
      this.getBase_container().add(delete_button);
      show_details.addListener("execute", function (e) {
                                 this.setMessage("");
                                 this.setMessage("details");
                               },this);
      delete_button.addListener("execute", function (e) {
                                 this.setMessage("");
                                 this.setMessage("delete");
                               },this);
    }
  }

});
