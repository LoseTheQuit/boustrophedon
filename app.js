'use strict';

let fs = require('fs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    tools = require('./tools.js')();

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

    console.log(req.body);
    console.log(req.body.token);

    res.send({
        name: "Brendan",
        token: req.body.token
    });

    //    var ig = require('instagram-node').instagram({});
    //
    //    ig.use({
    //        client_id: 'e272444723924d49bb78da2b5e5c4dfd',
    //        client_secret: '95196ee487154c46b9dcb662483aa509'
    //    });
    //
    //    var url = 'http://localhost:3000/_oauth/google#access_token=ya29.5HxuYol1Io8JLeGePDznbfkkwu_PC4uodKwG8_1clFYAn9AgdOV1WGpOTNQP3s76HAsn7Y4zWw&token_type=Bearer&expires_in=3600',
    //        access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
    //
    //    res.json({
    //        link: "https://www.instagram.com/oauth/authorize?client_id=b23670e220f14f1c89c11f627c9f9953&redirect_uri=https://the-mixup.herokuapp.com&response_type=code",
    //        LINK2: access_token
    //    });

    //    ig.media_popular(function (err, medias, remaining, limit) {
    //        console.log(medias);
    //
    //        //        //
    //        //        if (err) {
    //        //            console.log(err);
    //        //        } else {
    //        //            //            
    //        //        }
    //    });


    //    ig.add_like(req.body.media_id, {
    //        sign_request: {
    //            client_secret: '95196ee487154c46b9dcb662483aa509',
    //            // Then you can specify the request:
    //            client_req: req,
    //            // or the IP on your own:
    //            ip: 'XXX.XXX.XXX.XXX'
    //        }
    //    }, function (err) {
    //        // handle err here
    //        return res.send('NOT OK');
    //    });
});