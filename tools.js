var api = require('instagram-node').instagram();
var ig = require('instagram-node').instagram(),
    fs = require('fs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http');

app.set('port', (process.env.PORT || 5000));

module.exports = function () {
    this.sum = function (a, b) {
        return a + b
    };
    this.multiply = function (a, b) {
        return a * b
    };
    this.authenticate = function () {

        ig.use({
            access_token: 'YOUR_ACCESS_TOKEN'
        });

        ig.use({
            client_id: 'e272444723924d49bb78da2b5e5c4dfd',
            client_secret: '95196ee487154c46b9dcb662483aa509'
        });

        api.use({
            client_id: 'e272444723924d49bb78da2b5e5c4dfd',
            client_secret: '95196ee487154c46b9dcb662483aa509'
        });

        var redirect_uri = 'https://losethequit.herokuapp.com/';

        exports.authorize_user = function (req, res) {
            res.redirect(api.get_authorization_url(redirect_uri, {
                scope: ['likes'],
                state: 'a state'
            }));
        };

        exports.handleauth = function (req, res) {
            api.authorize_user(req.query.code, redirect_uri, function (err, result) {
                if (err) {
                    console.log(err.body);
                    return res.send("Didn't work");
                } else {
                    console.log('Yay! Access token is ' + result.access_token);
                    return res.send('You made it!!');
                }
            });
        };

        // This is where you would initially send users to authorize 
        app.get('/authorize_user', exports.authorize_user);
        // This is your redirect URI   
        app.get('/handleauth', exports.handleauth);

        ig.user('clxxxii', function (err, result, remaining, limit) {
            console.log(result);
            console.log(result);
            console.log(result);
        });

        //        http.createServer(app).listen(app.get('port'), function () {
        //            console.log("Express server listening on port " + app.get('port'));
        //        });
    };

};