qx.Class.define("dropnode.FileDashboardUI",
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
    initialize : function (event_bus){
      this.setEvent_bus(event_bus);
    },
    init_gui : function () {
      this.setBase_container(new qx.ui.splitpane.Pane("horizontal").set({
                                                                          width : 350,
                                                                          height : 100
                                                                        }));
    },
    add : function (container) {
      if (this.getBase_container().getChildren().length == 0) {
        this.getBase_container().add(container,3);
      }
      else {
        this.getBase_container().add(container,5);
      }
    }
  }
});
