'use strict';

let fs = require('fs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    tools = require('./tools.js')(),
    Client = require('node-rest-client').Client,
    https = require('https'),
    http = require('http');




var client = new Client();

let client_id = "b23670e220f14f1c89c11f627c9f9953";
let client_secret = "dd78c7ffbadd4a10a49f24675356c4d2";
let redirect_uri = 'https://the-mixup.herokuapp.com/handleauth';
var authorize_link = 'https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=code';

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


    var url = 'https://api.instagram.com/oauth/authorize/?client_id=' + instaData.client_id + '&redirect_uri=' + instaData.redirect_uri + '&response_type=code';
    res.writeHead(302, {
        Location: encodeURI(url)
    });

});

app.get('/authorize_user', function (req, res) {

    console.log('\n');
    console.log('*******************************************************'.black.bgWhite);
    console.log('INCOMING GET - authorize_user - REQUEST - Load Template'.black.bgWhite);
    console.log('*******************************************************'.black.bgWhite);
    res.redirect(authorize_link);

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

app.post('/ig', function (req, res, next) {

    console.log(req.body);
    console.log(req.body);
    console.log(req.body);
    console.log(req.body);

    console.log(req.body.token);

    let ACCESS_TOKEN = req.body.token;


    //        
    //        curl -F 'client_id=b23670e220f14f1c89c11f627c9f9953' \
    //        -F 'client_secret=dd78c7ffbadd4a10a49f24675356c4d2' \
    //        -F 'grant_type=authorization_code' \ 
    //        -F 'redirect_uri=https://the-mixup.herokuapp.com' \
    //        -F 'code=CODE' \
    //        https://api.instagram.com/oauth/access_token

    var request = require('request');
    var post_data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code': ACCESS_TOKEN
    };
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    var post_options = {
        url: 'https://api.instagram.com/oauth/access_token',
        method: 'POST',
        headers: headers,
        form: post_data
    };

    request(post_options, function (error, response, body) {

        console.log(response.body)
        console.log(response.statusCode)

        if (error || response.statusCode != 200) {
            console.error(error);
        } else {
            var pbody = JSON.parse(body);
            console.log('Response: ' + pbody);
            console.log('pbody.access_token: ' + pbody.access_token);
            var options = {
                url: 'https://api.instagram.com/v1/tags/MYTAG/media/recent?access_token=' + pbody.access_token,
                method: 'GET'
            };
            request(options, function (error, response, body) {
                if (error && response.statusCode != 200) {
                    console.error(error);
                } else {
                    var jsonobjArr = JSON.parse(body);
                    console.log(jsonobjArr);
                }
            });

        }
    });


});


///////////////////////////////////////////////////
///////////////////////////////////////////////////

//  client.post('https://api.instagram.com/oauth/access_token', post_options, function (data, response) {
//        // parsed response body as js object 
//
//        res.send(data);
//        //        console.log(data);
//
//        // raw response 
//        // console.log(response);
//
//    });

///////////////////////////////////////////////////
///////////////////////////////////////////////////


app.get('/handleauth', function (req, res) {
    res.send("ok");

    for (let key in req.body) {

        console.log('KEY  ' + key)
        console.log('DATA ' + req.query[key])

    }

    if (!req.query['code']) {

        var request = require('request');
        var post_data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': 'authorization_code',
            'redirect_uri': redirect_uri,
            'code': req.query['code']
        };
        var headers = {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        var post_options = {
            url: 'https://api.instagram.com/oauth/access_token',
            method: 'POST',
            headers: headers,
            form: post_data
        };

        //console.log(post_options)


        request(post_options, function (error, response, body) {

            console.log(response.body)
            console.log(response.statusCode)

            if (error || response.statusCode != 200) {
                console.error(error);
            } else {
                var pbody = JSON.parse(body);
                console.log('Response: ' + pbody);
                console.log('pbody.access_token: ' + pbody.access_token);
                var options = {
                    url: 'https://api.instagram.com/v1/tags/MYTAG/media/recent?access_token=' + pbody.access_token,
                    method: 'GET'
                };
                request(options, function (error, response, body) {
                    if (error && response.statusCode != 200) {
                        console.error(error);
                    } else {
                        var jsonobjArr = JSON.parse(body);
                        console.log(jsonobjArr);
                    }
                });

            }
        });

    }
});

https.createServer(app).listen(4000, function () {
    console.log("HTTPS Express Instagram server listening on port " + 4000);
});