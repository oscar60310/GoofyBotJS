var express = require('express');
var http = require('http');
var app = express();

var port = process.env.port || 1337;
// 放靜態資源，也就是我們主要 html js 等等前端的東西
app.use('/', express.static('static'));
http.createServer(app).listen(port);
console.log('server started');

