'use strict';

let fs = require('fs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    tools = require('./tools.js')(),
    Client = require('node-rest-client').Client;

var client = new Client();



let instaData = {
    client_id: 'b23670e220f14f1c89c11f627c9f9953',
    client_secret: 'dd78c7ffbadd4a10a49f24675356c4d2',
    grant_type: 'authorization_code',
    redirect_uri: 'https://the-mixup.herokuapp.com'
}


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

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {

    console.log('\n');
    console.log('************************************'.black.bgWhite);
    console.log('INCOMING GET REQUEST - Load Template'.black.bgWhite);
    console.log('************************************'.black.bgWhite);
    var html = fs.readFileSync('static/views/initShell.html');
    res.end(html);

});

app.get('/getAuthCode', function (req, res) {

    console.log('\n');
    console.log('************************************'.black.bgWhite);
    console.log('INCOMING GET REQUEST - Load Template'.black.bgWhite);
    console.log('************************************'.black.bgWhite);
    var url = 'https://api.instagram.com/oauth/authorize/?client_id=' + instaData.client_id + '&redirect_uri=' + instaData.redirect_uri + '&response_type=code';
    response.writeHead(302, {
        Location: encodeURI(url)
    });

});


app.post('/', function (req, res) {

    console.log('\n');
    console.log('*********************'.black.bgWhite);
    console.log('INCOMING POST REQUEST'.black.bgWhite);
    console.log('*********************'.black.bgWhite);
    console.log('\n');
    console.log(req.body);

    res.send({
        name: "brendan",
        age: "28"
    });

});

app.listen(app.get('port'), function () {

    console.log('\n');
    console.log('********************************************'.black.bgWhite);
    console.log("The frontend server is running on port 5000!".black.bgWhite);
    console.log('********************************************'.black.bgWhite);
    console.log('\n');

});


let BASE_IG_URL = 'https://api.instagram.com/oauth/access_token';
let IG_CLIENT_SECRET = '&client_secret=95196ee487154c46b9dcb662483aa509'
let ds = 'grant_type=authorization_code';

app.post('/ig', function (req, res, next) {

    console.log(req.body);
    console.log(req.body.token);
    let ACCESS_TOKEN = req.body.token;

    let instaData = {
        client_id: 'b23670e220f14f1c89c11f627c9f9953',
        client_secret: 'dd78c7ffbadd4a10a49f24675356c4d2',
        grant_type: 'authorization_code',
        redirect_uri: 'https://the-mixup.herokuapp.com',
        code: ACCESS_TOKEN
    }


    client.post('https://api.instagram.com/oauth/access_token', JSON.stringify(instaData), function (data, response) {
        // parsed response body as js object 
        res.send(data);
        console.log(data);

        // raw response 
        // console.log(response);

    });

});