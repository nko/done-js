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

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }
      qx.Class.include(qx.ui.treevirtual.TreeVirtual,
                       qx.ui.treevirtual.MNode);

      this.event_bus = qx.event.message.Bus;

      this.deleteDialogController = dropnode.DeleteDialogController;
      this.deleteDialogController.getInstance().initialize(this.event_bus, new dropnode.DeleteDialogUI);
      this.getRoot().add(this.deleteDialogController.getInstance().getUi().getBase_container());

      this.baseUIController = dropnode.BaseUIController;
      this.baseUIController.getInstance().initialize(this.event_bus, new dropnode.BaseUI);
      this.getRoot().add(this.baseUIController.getInstance().getUi().base_container, {edge: 0});

      // this.toolbarController = dropnode.ToolbarController;
      // this.toolbarController.getInstance().initialize(this.event_bus,new dropnode.ToolbarUI);
      // this.baseUIController.getInstance().add(this.toolbarController.getInstance());

      this.fileDashboardController = dropnode.FileDashboardController;
      this.fileDashboardController.getInstance().initialize(this.event_bus,new dropnode.FileDashboardUI);
      this.baseUIController.getInstance().add(this.fileDashboardController.getInstance());

      this.fileTreeController = dropnode.FileTreeController;
      this.fileTreeController.getInstance().initialize(this.event_bus, new dropnode.FileTreeUI);
      this.fileDashboardController.getInstance().add(this.fileTreeController.getInstance());

      // this.recipientDisplayController = dropnode.RecipientDisplayController;
      // this.recipientDisplayController.getInstance().initialize(this.event_bus, new dropnode.RecipientDisplayUI);
      // this.fileDashboardController.getInstance().add(this.recipientDisplayController.getInstance());

    }
  }
});
