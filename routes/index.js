module.exports = function(app, addon) {
    var request = require("request");
    // Root route. This route will serve the `atlassian-connect.json` unless the
    // documentation url inside `atlassian-connect.json` is set
    app.get('/', function(req, res) {
        res.format({
            // If the request content-type is text-html, it will decide which to serve up
            'text/html': function() {
                res.redirect('/atlassian-connect.json');
            },
            // This logic is here to make sure that the `atlassian-connect.json` is always
            // served up when requested by the host
            'application/json': function() {
                res.redirect('/atlassian-connect.json');
            }
        });
    });

    // This is an example route that's used by the default "generalPage" module.
    // Verify that the incoming request is authenticated with Atlassian Connect
    app.get('/hello-world', addon.authenticate(), function(req, res) {


/*
        var options = {
            method: 'GET',
            url: 'https://demo.spiraservice.net/bakaproof/Services/v5_0/RestService.svc/data-syncs',
            headers: {
                'postman-token': 'faa6d6ea-d579-cbe9-e7a7-58c464c2fc06',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: 'Basic YWRtaW5pc3RyYXRvcjp7RkFDMDM5MzQtQTQ0Qy00RkVDLTg1REYtRTc5RUMwODgwODA5fQ=='
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
*/
        res.render('hello-world', {
            title: 'Atlassian Connect'
                //issueId: req.query['issueId']
        });
    });

app.post('/spirateam', function(req, res) {

    console.log(req.body.url)

    var options = {
        method: 'POST',
        url: req.body.url,
        headers: {
            'content-type': 'application/json',
            authorization: 'Basic ' + req.body.encoded
        },
        body: req.body.data,
       json: true 
    };
    
    console.log(options)

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

       
        console.log(response.body);
    });






    res.send('POST request to homepage');
});


app.get('/test', function(req, res) {
         res.render('test', {
            title: 'Atlassian Connect'
                //issueId: req.query['issueId']
        });
    });




    // Add any additional route handlers you need for views or REST resources here...


    // load any additional files you have in routes and apply those to the app
    {
        var fs = require('fs');
        var path = require('path');
        var files = fs.readdirSync("routes");
        for (var index in files) {
            var file = files[index];
            if (file === "index.js") continue;
            // skip non-javascript files
            if (path.extname(file) != ".js") continue;

            var routes = require("./" + path.basename(file));

            if (typeof routes === "function") {
                routes(app, addon);
            }
        }
    }
};
