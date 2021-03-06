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
    app.get('/webPanel', addon.authenticate(), function(req, res) {
        res.render('webPanel', {
            title: 'Atlassian Connect'
        });
    });

    app.post('/spirateam', function(req, res) {
        // setting up a post request containing the name of the JIRA issue in the body 
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
        
        //request is sent 
        request(options1, function(error, response, body) {
            if (error) throw new Error(error);

            console.log(typeof response.body)
        //if response body is empty, we end the response here 
            if (response.body == '[]' || JSON.stringify(response.body) == '[]') {
                
               res.end()
            }
        //if its not empty, we prepare a GET request that uses the artifact id of the last response 
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
                
                
        //SpiraTeam requirement details are sent back to the browser in JSON
                request(options2, function(error, response, body) {
                    if (error) throw new Error(error);
                    res.json(response.body);
                });
            }
        });
    });


    app.get('/config', function(req, res) {
        res.render('config', {
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
