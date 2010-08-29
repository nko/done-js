qx.Class.define("dropnode.FileDashboardController",
{
  extend : dropnode.Controller,
  type : 'singleton',
  members : {
    _processMessage : function () {
      this.debug("File Dashboard Controller " + this.getMessage());
    },
    error : function (error) {
      this.getParent().error(error);
    }
  }
});
