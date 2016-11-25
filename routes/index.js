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



        res.render('hello-world', {
            title: 'Atlassian Connect'

        });
    });

    app.post('/spirateam', function(req, res) {



        var options1 = {
            method: 'POST',
            url: req.body.url,
            headers: {
                'content-type': 'application/json',
                authorization: 'Basic ' + req.body.encoded
            },
            body: req.body.data,
            json: true
        };




        request(options1, function(error, response, body) {
            if (error) throw new Error(error);

            console.log(typeof response.body)

            if (response.body == '[]' || JSON.stringify(response.body) == '[]') {
                console.log('inside')
               res.end()
            }

            else {
                var requirement = response.body[0].ArtifactIds[0];

                var options2 = {
                    method: 'GET',
                    url: req.body.reqUrl + requirement,
                    headers: {
                        'content-type': 'application/json',
                        authorization: 'Basic ' + req.body.encoded
                    },
                    json: true
                };
                console.log(req.body.reqUrl + requirement)
                request(options2, function(error, response, body) {
                    if (error) throw new Error(error);

                    
                    res.json(response.body);
                });
            }

        });


        
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
