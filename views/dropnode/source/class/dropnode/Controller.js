qx.Class.define("dropnode.Controller",
{
  extend : qx.core.Object,
  properties : {
    ui : {

    },
    event_bus : {

    },
    type : {

    },
    message : {

    },
    parent : {

    },
    children : {
      init : new Array()
    }
  },
  members : {
    initialize : function (event_bus, ui) {
      this.setEvent_bus(event_bus);
      this.setUi(ui);
      this.setChildren(new qx.data.Array());
      this.getUi().initialize(this.getEvent_bus());
      this.getUi().init_gui();

      this._addReactors();
      this._addListeners();
      this._addBindings();
    },
    error : function (error) {
      this.getUi().error(error);
    },
    add : function (controller){
      this.getUi().add(controller.getUi().getBase_container());
      controller.setParent(this);
      var children = this.getChildren();
      children.push(controller);
      this.setChildren(children);
    },
    _dispatch : function (message,data){
      this.getEvent_bus.getInstance().dispatch(new qx.event.message.Message(message,data));
    },
    _subscribe : function (message, callback, context) {
      this.getEvent_bus().subscribe(message, function (message) {
                                      var func = dropnode.Utilites.makeCallback(callback,context);
                                      func(message.getData());
                                    },context);
    },
    _processMessage : function (){
      this.debug("Controller's message : " + this.getMessage());
    },
    _addListeners : function () {},
    _addReactors : function () {},
    _addBindings : function () {}
  }
});
