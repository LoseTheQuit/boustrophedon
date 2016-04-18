var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();
var app = express();

app.configure(function () {
    // The usual... 
});

api.use({
    client_id: 'e272444723924d49bb78da2b5e5c4dfd',
    client_secret: '95196ee487154c46b9dcb662483aa509'
});