// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', ["chart.js"])
.config(function(ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
 
            responsive: false
        });

    })
.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    });


// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($scope, $window, $http, $timeout, objectmaker) {
    
    var baseUrl = $window.base;

    $scope.labels = ["Failed", "Passed", "Not Run","Blocked","Caution"];
    $scope.colors = ['#f47457','#7eff7a','#e0e0e0','#f4f356','#f29e56'];
     

    $scope.CoverageCountTotal;
    $scope.CoverageCountPassed;
    $scope.CoverageCountFailed;
    $scope.CoverageCountCaution;
    $scope.CoverageCountBlocked;

    $scope.issueKey; //JIRA issue id
    $scope.projectKey //JIRA project id
    $scope.spiraURL; //host URL of our SpiralTeam instance

    $scope.apiKey; //SpiralTeam API key 
    $scope.username; //SpiralTeam username
    $scope.projectID; //SpiralTeam Project ID  
    $scope.dataMappingID;

    $scope.apiKey; //SpiralTeam API key response.data.CoverageCountTotal

    

    AP.resize(); //resized iframe to proper width


    //Getting JIRA issue and project keys 
    AP.require("_util", function(util) {
        
        // full URL of host app
        var hostString = util.decodeQueryComponent(window.location.href);
        
        //query strings are parsed with URI.js
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
                    
                    
                    console.log(response)
                    $scope.spiraURL = response.value.spiraURL
                    $scope.apiKey = response.value.apiKey
                    $scope.username = response.value.username
                    $scope.dataMappingID = response.value.dataMappingID
                    $scope.projectID = response.value.projectID
                    //update scope values within the callback
                    $scope.$apply();


var requestdata = objectmaker.objectmaker($scope.spiraURL,$scope.dataMappingID,$scope.projectID,$scope.username,$scope.apiKey,$scope.issueKey)
                 
                    
                  
                    console.log(requestdata)

                    $http({
                        method: 'POST',
                        url: '/spirateam',
                        data: requestdata
                    }).then(function successCallback(response) {
                        console.log(response)
                        $scope.CoverageCountTotal = response.data.CoverageCountTotal
                        $scope.CoverageCountPassed = response.data.CoverageCountPassed
                        $scope.CoverageCountFailed = response.data.CoverageCountFailed
                        $scope.CoverageCountCaution = response.data.CoverageCountCaution
                        $scope.CoverageCountBlocked = response.data.CoverageCountBlocked
                        //Not run = total - (blocked + Caution + Failed+ Passed)
                var notRun = $scope.CoverageCountTotal - ($scope.CoverageCountPassed + $scope.CoverageCountFailed + $scope.CoverageCountCaution + $scope.CoverageCountBlocked )
 $scope.data = [$scope.CoverageCountFailed, $scope.CoverageCountPassed, notRun,$scope.CoverageCountBlocked,$scope.CoverageCountCaution];
                    }, function errorCallback(response) {
                        console.log(response);
                    });

                }

            });

        });

    });

});

phonecatApp.factory("objectmaker",function(){
 
 return {

    objectmaker : function(spiraURL,dataMappingID,projectID,username,apiKey,issueKey) {
        var url = spiraURL + '/Services/v5_0/RestService.svc/data-mappings/' + dataMappingID + '/artifacts/1/search';
        var reqUrl = spiraURL + '/Services/v5_0/RestService.svc/projects/' + projectID + '/requirements/'
        var preauth = username + ":" + apiKey
        var encoded = btoa(preauth);
        var data = issueKey;
          var requestdata = {
                        url: url,
                        encoded: encoded,
                        data: data,
                        reqUrl: reqUrl
                    }
                    console.log(requestdata)
                    return requestdata
    }

    }
 
  
});

phonecatApp.factory("request", function($http, requestdata, CoverageCountTotal, CoverageCountPassed, CoverageCountFailed, CoverageCountCaution, CoverageCountBlocked, data) {

    $http({
        method: 'POST',
        url: '/spirateam',
        data: requestdata
    }).then(function successCallback(response) {
        console.log(response)
        CoverageCountTotal = response.data.CoverageCountTotal
        CoverageCountPassed = response.data.CoverageCountPassed
        CoverageCountFailed = response.data.CoverageCountFailed
        CoverageCountCaution = response.data.CoverageCountCaution
        CoverageCountBlocked = response.data.CoverageCountBlocked
            //Not run = total - (blocked + Caution + Failed+ Passed)
        var notRun = CoverageCountTotal - (CoverageCountPassed + CoverageCountFailed + CoverageCountCaution + CoverageCountBlocked)
        
        return [CoverageCountFailed, CoverageCountPassed, notRun, CoverageCountBlocked, CoverageCountCaution];
    }, function errorCallback(response) {
        console.log(response);
    });


});