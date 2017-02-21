'use strict';

var http = require('http');
var express = require('express');

var app = express();
var proxy = require('http-proxy-middleware');
var config = {
    backendUrl: 'http://localhost:3000',
    port: process.env.PORT || 80
};

app.use('/', express.static(__dirname + '/app'));
app.use('/api', proxy({target: config.backendUrl, changeOrigin: true}));

app.get('*', function (req, res)
{
    res.sendFile(__dirname + '/app/index.html');
});

var httpListener = http.createServer(app).listen(config.port, function ()
{
    console.info('listening on port', httpListener.address().port);
});
