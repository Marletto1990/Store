var express = require('express');
var cors = require('cors')
var path = require('path');
var fs = require('fs');
//--
var proxy = require('express-http-proxy');
var app = express();

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // 'Access-Control-Allow-Origin: *'
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // http://sap14:8030/sap/hana/ide/catalog/
  next();
}

console.log('app use ...');
console.log(__dirname);
// app.use(allowCrossDomain);
app.use('/', express.static(__dirname + '/'));
//app.use(cors());

console.log('proxy ...')
//--
app.use('/proxy', proxy('services.odata.org', {
  forwardPath: function (req, res) {
    return require('url').parse(req.url).path;
  }
}));
console.log('server ...')

var server = app.listen(3000, function () {
  console.log('Сервер Express запущен на http://localhost:3000');
});

app.use(/^\/resources\/.+/, function (request, response) {

  var sEndUrl = request.originalUrl.replace("/resources/", "");
  var sPathPrefix = path.join(__dirname, '../../sapui5-sdk-1.65.1/resources/');
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
  console.log(sReq);
  response.send(sReq);
 
})