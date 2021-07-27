const express = require("express");
var app = express();
var mongodbutil = require("./database/database");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
mongodbutil.connectToServer(function (err){
    var actionsRouter = require("./routers/actions");
    app.use('/device', actionsRouter);   
});


app.listen(8000);
