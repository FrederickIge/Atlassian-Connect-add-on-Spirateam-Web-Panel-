// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($scope, $window, $http) {
    var baseUrl = $window.base;

    $scope.issueKey;    //JIRA issue id
    $scope.projectKey   //JIRA project id
    $scope.spiraURL;    //host URL of our SpiralTeam instance

    $scope.apiKey;      //SpiralTeam API key 
    $scope.username;    //SpiralTeam username
    $scope.projectID;   //SpiralTeam Project ID   


    AP.resize();        //resized iframe to proper width


    //Getting JIRA issue and project keys 
    AP.require("_util", function(util) {
        var hostString = util.decodeQueryComponent(window.location.href);
        var qs = URI(hostString).query(true);
        $scope.issueKey = qs['issueKey'];
        $scope.projectKey = qs['projectKey'];

       //Getting SpiraTeam Config info (stored in JIRA project config settings)
        AP.require(['request'], function(request) {
            request({
                url: baseUrl + '/rest/api/latest/project/' + $scope.projectKey + '/properties/spira',
                success: function(response) {
                    
                    // Convert the string response to JSON
                    response = JSON.parse(response);
                    $scope.spiraURL = response.value.spiraURL
                    $scope.apiKey = response.value.apiKey
                    $scope.username = response.value.username
                    $scope.projectID = response.value.projectID
                    //update scope values within the callback
                    $scope.$apply();


                    //The SpiraTeam Instance URL
                    var url = $scope.spiraURL + '/Services/v5_0/RestService.svc/data-mappings/6/artifacts/1/search'//NOTE: NEED TO INCLUDE DATA MAPPING VARIABLE
                        //user + apikey to get into SpiraTeam
                    var preauth = $scope.username + ":" + $scope.apiKey
                        //Base64 encoded header 
                    var encoded = btoa(preauth);
                    //The Issue Key
                    var data = $scope.issueKey;


                    var requestdata = {
                        url: url,
                        encoded: encoded,
                        data: data
                    }
                    console.log(requestdata)

                    $http({
                        method: 'POST',
                        url: '/spirateam',
                        data: requestdata
                    }).then(function successCallback(response) {

                    }, function errorCallback(response) {

                    });

                }

            });

        });

    });

});