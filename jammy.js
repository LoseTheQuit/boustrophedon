var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();
var app = express();

api.use({
    client_id: 'e272444723924d49bb78da2b5e5c4dfd',
    client_secret: '95196ee487154c46b9dcb662483aa509'
});

var redirect_uri = 'http://www.losethequit.me';

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
            res.send("Didn't work");
        } else {
            console.log('Yay! Access token is ' + result.access_token);
            res.send('You made it!!');
        }
    });
};

// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/handleauth', exports.handleauth);

app.set('port', (process.env.PORT || 5001));

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});