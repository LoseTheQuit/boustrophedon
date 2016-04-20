'use strict';

let fs = require('fs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    tools = require('./tools.js')(),
    https = require('https'),
    http = require('http');


let client_id = "b23670e220f14f1c89c11f627c9f9953";
let client_secret = "dd78c7ffbadd4a10a49f24675356c4d2";
let redirect_uri = 'http://127.0.0.1:5000';
var authorize_link = 'https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=code';


console.log(sum(5, 2));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())
app.use(express.static('static'));
app.use(express.static('bower_components'));
app.use(express.static(__dirname + 'conn'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static('conn'));

app.get('/', function (req, res) {

    console.log('\n');
    console.log('************************************'.black.bgWhite);
    console.log('INCOMING GET REQUEST - Load Template'.black.bgWhite);
    console.log('************************************'.black.bgWhite);
    var html = fs.readFileSync('static/views/initShell.html');
    res.end(html);

});

app.get('/authorize_user', function (req, res) {

    console.log('\n');
    console.log('*******************************************************'.black.bgWhite);
    console.log('INCOMING GET - authorize_user - REQUEST - Load Template'.black.bgWhite);
    console.log('*******************************************************'.black.bgWhite);
    res.redirect(authorize_link);

});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {

    console.log('\n');
    console.log('********************************************'.black.bgWhite);
    console.log("The frontend server is running on port 5000!".black.bgWhite);
    console.log('********************************************'.black.bgWhite);
    console.log('\n');

});

app.post('/ig', function (req, res, next) {

    console.log('\n');
    console.log('*******************************************************'.black.bgGreen);
    console.log('ACCESS_CODE: ' + req.body.token);

    let ACCESS_CODE = req.body.token;

    let request = require('request');

    let post_data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code': ACCESS_CODE
    };

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    var post_options = {
        url: 'https://api.instagram.com/oauth/access_token',
        method: 'POST',
        headers: headers,
        form: post_data
    };


    request(post_options, function (error, response, body) {

        var parsedBody = JSON.parse(body);
        console.log('*******************************************************'.black.bgGreen);
        console.log(parsedBody);
        console.log('*******************************************************'.black.bgGreen);

        if (response.statusCode != 200) {
            console.error(error);
        } else {

            console.log('ACCESS_TOKEN: ' + parsedBody.access_token);

            var self_search = {
                url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + parsedBody.access_token,
                method: 'GET'
            };
            var media_search = {
                url: 'https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=' + parsedBody.access_token,
                method: 'GET'
            };
            var popular_tag_search = {
                url: 'https://api.instagram.com/v1/tags/search?q=red&access_token=' + parsedBody.access_token,
                method: 'GET'
            };
            var popular_media_search = {
                url: 'https://api.instagram.com/v1/media/popular?access_token=' + parsedBody.access_token,
                method: 'GET'
            };
            var from_SO_search = {
                url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + client_id + '&callback=' +
                    redirect_uri + '&access_token=' + parsedBody.access_token,
                method: 'GET'
            }

            request(popular_tag_search, function (error, response, body) {
                if (error && response.statusCode != 200) {
                    console.error(error);
                } else {
                    var jsonobjArr = JSON.parse(body);
                    console.log('*******************************************************'.black.bgGreen);
                    // console.log(jsonobjArr);
                    console.log('*******************************************************'.black.bgGreen);
                    res.send(jsonobjArr);
                }
            });
        }
    });

});