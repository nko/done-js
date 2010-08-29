qx.Class.define("dropnode.BaseUI",
{
  extend : qx.core.Object,
  properties : {
    event_bus : {
      nullable: true
    },
    base_container : {
      nullable : true
    },
    app_container : {
      nullable : true
    }
  },
  members : {
    initialize : function (event_bus) {
      this.setEvent_bus(event_bus);
    },
    init_gui : function () {
      this.base_container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      this.base_container.add(this.main_header());

      this.app_container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      this.base_container.add(this.app_container);
    },

    main_header : function () {
      var layout  = new qx.ui.layout.HBox();
      var header = new qx.ui.container.Composite(layout);
      header.setAppearance("app-header");

      var title = new qx.ui.basic.Label("Sharer Dashboard");
      var version = new qx.ui.basic.Label("DropNode 0.1");

      header.add(title);
      header.add(new qx.ui.core.Spacer, {flex : 1});
      header.add(version);

      return header;
    },

    add : function (container) {
      this.app_container.add(container);
    },

    error : function () {

    }
  }
});
