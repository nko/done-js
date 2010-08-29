/* ************************************************************************

#asset(dropnode/*)

************************************************************************ */
qx.Class.define("dropnode.Application",
{
  extend : qx.application.Standalone,
  members :
  {
    main : function() {
      this.base(arguments);

      this.event_bus = qx.event.message.Bus;

      this.baseUIController = dropnode.BaseUIController;
      this.baseUIController.getInstance().initialize(this.event_bus, new dropnode.BaseUI);
      this.getRoot().add(this.baseUIController.getInstance().getUi().base_container, {edge: 0});

      this.fileDashboardController = dropnode.FileDashboardController;
      this.fileDashboardController.getInstance().initialize(this.event_bus,new dropnode.FileDashboardUI);
      this.baseUIController.getInstance().add(this.fileDashboardController.getInstance());

      this.fileTreeController = dropnode.FileTreeController;
      this.fileTreeController.getInstance().initialize(this.event_bus, new dropnode.FileTreeUI);
      this.fileDashboardController.getInstance().add(this.fileTreeController.getInstance());

      this.recipientDisplayController = dropnode.RecipientDisplayController;
      this.recipientDisplayController.getInstance().initialize(this.event_bus, new dropnode.RecipientDisplayUI);
      this.fileDashboardController.getInstance().add(this.recipientDisplayController.getInstance());
    }
  }
});
