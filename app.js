'use strict';

var fs = require('fs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    tools = require('./tools.js')();

console.log(sum(1, 2));


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())
app.use(express.static('static'));
app.use(express.static('bower_components'));
app.use(express.static(__dirname + 'conn'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static('conn'));

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    console.log(authenticate());
    console.log('\n');
    console.log('************************************'.black.bgWhite);
    console.log('INCOMING GET REQUEST - Load Template'.black.bgWhite);
    console.log('************************************'.black.bgWhite);
    var html = fs.readFileSync('static/views/initShell.html');
    res.end(html);

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
    var ig = require('instagram-node').instagram({});
    ig.use({
        access_token: 'YOUR_ACCESS_TOKEN'
    });

    ig.add_like(req.body.media_id, {
        sign_request: {
            client_secret: '95196ee487154c46b9dcb662483aa509',
            // Then you can specify the request:
            client_req: req,
            // or the IP on your own:
            ip: 'XXX.XXX.XXX.XXX'
        }
    }, function (err) {
        // handle err here
        return res.send('OK');
    });
});

//