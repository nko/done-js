qx.Class.define("dropnode.TestUsers",
{
  extend : qx.core.Object,
  statics : {
    shared_files : [{
                      name : "TestFile.jpeg",
                      encodedName : "abcdef",
                      url : "1.com",
                      recipients : [ {progress : 10},
                                     {progress : 50},
                                     {progress : 0}
                                   ]
                    },
                    {
                      name : "TestFile2.jpeg",
                      encodedName : "ghijkl",
                      url : "2.com",
                      recipients : [ {progress : 15},
                                     {progress : 100}
                                   ]
                    }]
  }
});
