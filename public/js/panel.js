// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($scope, $window, $http) {
    var baseUrl = $window.base;
    $scope.test = 'lol'
    $scope.issueKey = 'hey'
    $scope.projectKey
    $scope.spiraURL;
    $scope.apiKey;
    $scope.username;
    $scope.projectID;




    $.getScript($window.base + '/atlassian-connect/all-debug.js', function() {
        // your calls to AP herevar resize = function() {
        AP.resize();

        AP.getLocation(function(location) {
            var broken = location.split("/")
            $scope.issueKey = broken[broken.length - 1]
            $scope.projectKey = $scope.issueKey.replace(/[^A-Z]/g, '');
            console.log($scope.projectKey)
            $scope.$apply();

            AP.require("_util", function(util) {
               var hostString = util.decodeQueryComponent(window.location.href);
               alert(hostString);
               var qs = URI(hostString).query(true);
               var issueKey = qs['issueKey'];
               console.log(issueKey);
               alert(issueKey);
            });

            AP.require(['request'], function(request) {
                request({
                    url: baseUrl + '/rest/api/latest/project/' + $scope.projectKey + '/properties/spira',
                    success: function(response) {
                        // Convert the string response to JSON
                        response = JSON.parse(response);

                        console.log(response)
                        $scope.spiraURL = response.value.spiraURL
                        $scope.apiKey = response.value.apiKey
                        $scope.username = response.value.username
                        $scope.projectID = response.value.projectID
                        $scope.$apply();


                        //The SpiraTeam Instance URL
                        var url = $scope.spiraURL + '/Services/v5_0/RestService.svc/data-mappings/6/artifacts/1/search'
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

});