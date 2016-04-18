'use strict';
var fs = require('fs');
var colors = require('colors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


app.use(express.static('static'));
app.use(express.static('bower_components'));
app.use(express.static(__dirname + 'conn'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static('conn'));

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {

    console.log('INCOMING GET REQUEST - Load Template');
    var html = fs.readFileSync('static/views/initShell.html');
    res.end(html);

});


app.post('/', function (req, res) {

    console.log('INCOMING POST REQUEST - Load Template');
    console.log(req.body);
    res.send({
        name: "nodejswashere",
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