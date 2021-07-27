var MongoClient = require("mongodb").MongoClient;
var _db;

module.exports = {
  // Connect to database , return the DeviceInventory collection,
  // if not found , create a new collection.

    connectToServer : function(callback){
        MongoClient.connect(
          "mongodb://localhost:27017",
          { useUnifiedTopology: true },
          function (err, client) {
            _db = client.db("DeviceInventory");
            return callback(err);
          }
        );

    },
   // Return the DeviceInventory collection.
    getDB : function(){
        return _db;
    }
}