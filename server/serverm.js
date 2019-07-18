var express = require('express');
var path = require('path');
var fs = require('fs');
var proxy = require('express-http-proxy');
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//--
const MongoClient    = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectID;
const jsonParser = express.json();
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
let dbClient;

app.use('/', express.static(__dirname + '../webapp'));

app.use('/proxy', proxy('services.odata.org', {
  forwardPath: function (req, res) {
    return require('url').parse(req.url).path;
  }
}));
console.log('server ...')

var server = app.listen(8080, function () {
console.log('Сервер Express запущен на http://localhost:8080'); });

app.use(/^\/resources\/.+/, function (request, response) {
  

  var sEndUrl = request.originalUrl.replace("/resources/", "");
  var sPathPrefix = path.join(__dirname, '../../sapui5-sdk-1.66.1/resources/');
  response.sendFile(sPathPrefix + sEndUrl);
});

app.use("/modules/mainmodule/css/style.css", function (request, response) {
  var sPathPrefix = String(__dirname).replace("server","webapp");
  var sEndUrl = '/modules/mainmodule/css/style.css';
  response.sendFile(sPathPrefix+sEndUrl);
});

app.use("/Component-preload.js", function (request, response) {
  var sPathPrefix = String(__dirname).replace("server","webapp");
  var sEndUrl = '/Component-preload.js';
  response.sendFile(sPathPrefix+sEndUrl);
});

app.use("/Component.js", function (request, response) {
  var sPathPrefix = String(__dirname).replace("server","webapp");
  var sEndUrl = '/Component.js';
  response.sendFile(sPathPrefix+sEndUrl);
});

app.use("/manifest.json", function (request, response) {
  var sPathPrefix = String(__dirname).replace("server","webapp");
  var sEndUrl = "/manifest.json";
  response.sendFile(sPathPrefix+sEndUrl);
});

app.use(/^.+\/mainmodule\/.+/, function (request, response) {
  var sPathPrefix = String(__dirname).replace("server","webapp");
  var sEndUrl = request.originalUrl;
  response.sendFile(sPathPrefix+sEndUrl);
});

app.get("/getModelData", function(request, response){
  var filePath = __dirname + '/serverData.json';
  var sReq = fs.readFileSync(filePath,"utf8");
  response.send(sReq);
 
})

app.post("/sendNewOrder", function (request, responce){
  var body = request.body
  responce.send(body);
  console.dir(body);
})

app.use(/^\/resources\/.+/, function (request, response) {

  var sEndUrl = request.originalUrl.replace("/resources/", "");
  var sPathPrefix = path.join(__dirname, '../../sapui5-sdk-1.66.1/resources/');
  response.sendFile(sPathPrefix + sEndUrl);
});

app.get("/", function (req, res) {

  res.sendFile(path.join(__dirname, '../webapp/index.html'))
});