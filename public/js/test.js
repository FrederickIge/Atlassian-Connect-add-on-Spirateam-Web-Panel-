console.log('TEST')

// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', ['ngRoute']);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('ConfigController', function ConfigController($scope, $window, $http, $route, $location) {
    
    var baseUrl = $window.base; //get base URL: https://femidev.atlassian.net
    $scope.projectKey; //get current project - FEM



    $scope.submit = function() {
        var submission = {
            spiraURL: $scope.spiraURL,
            username: $scope.username,
            apiKey: $scope.apiKey,
            projectID: $scope.projectID

        }
        
        submission = angular.toJson(submission, true );
      

        AP.require('request', function(request) {
            request({
                url: baseUrl + '/rest/api/latest/project/' + $scope.projectKey + '/properties/spira',
                type: 'PUT',
                contentType: "application/json",
                data: submission,
                success: function(responseText) {
                    location.reload();
                },
                error: function(responseText) {
                    alert('error');
                     console.log(responseText.responseText)
                }
            });
        });

    }

    
        AP.resize();
        AP.getLocation(function(location) {
           
            var qs = URI(location).query(true);



            $scope.projectKey = qs['project.key'];
            console.log($scope.projectKey)
            $scope.$apply();

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
                    },
                    contentType: "application/json"
                });
                
            });

        });

    

});