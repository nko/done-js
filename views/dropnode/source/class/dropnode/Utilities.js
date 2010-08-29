qx.Class.define("dropnode.Utilities",
{
  statics:{
    server : "localhost",
    makeCallback : function (func,context) {
      return qx.lang.Function.bind(func,context);
    },
    makeReq : function (parameterObject) {
      var req = new qx.io.remote.Request(dropnode.Utilites.server, "GET");
    },
    withReq : function (service, success_func, fail_func) {
      var req = dropnode.Utilites.makeReq(service);
      var that_success_func = success_func;
      var that = this;
      req.addListener("completed", function (e) {
                        var resp = new qx.util.Json.parseQx(e.getContent());
                        var error = {name : resp.error,
                                     message : resp.error};
                        if (error.name != null) {
                          fail_func(error);
                        }
                        else {
                          try {
                            success_func(qx.util.Json.parseQx(resp.result));
                          } catch (x) {
                            fail_func({name : "JSONParseError",
                                       message : resp.result});
                          }
                        }
                      });
    },
    withMockReq : function (service, success_func, fail_func, mock_response) {
      var error = {
        name : mock_response.error,
        message : mock_response.error
      };
      if (error.name != "null") {
        success_func(mock_response);
      } else {
        fail_func(mock_response.error);
      }
    }
  }
});
