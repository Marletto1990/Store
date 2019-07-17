var express = require('express');
var path = require('path');
var fs = require('fs');
var proxy = require('express-http-proxy');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//--
const MongoClient    = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectID;
const jsonParser = express.json();
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
let dbClient;

app.use('/', express.static(__dirname + '/'));

app.use('/proxy', proxy('services.odata.org', {
  forwardPath: function (req, res) {
    return require('url').parse(req.url).path;
  }
}));
console.log('server ...')

var server = app.listen(3000, function () {
console.log('Сервер Express запущен на http://localhost:3000'); });

app.use(/^\/resources\/.+/, function (request, response) {

  var sEndUrl = request.originalUrl.replace("/resources/", "");
  var sPathPrefix = path.join(__dirname, '../../sapui5-sdk-1.66.1/resources/');
  response.sendFile(sPathPrefix + sEndUrl);
});

app.get("/", function (req, res) {
  //console.log("ALL");
  res.sendFile(__dirname + '/index.html')
});

// app.get("takeModel", function (req, res) {
//  
// });

app.get("/getModelData", function(request, response){
  var filePath = __dirname + '/serverData.json';
  var sReq = fs.readFileSync(filePath,"utf8");
  //console.log(sReq);
  response.send(sReq);
 
})

app.post("/sendNewOrder", function (request, responce){
  var body = request.body
  responce.send(body);
  console.dir(body);
})