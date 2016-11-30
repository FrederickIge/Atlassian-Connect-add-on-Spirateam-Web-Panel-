var phonecatApp = angular.module('phonecatApp', ["chart.js"])

    .config(function(ChartJsProvider) {ChartJsProvider.setOptions({responsive: false});})
    .config(function($interpolateProvider) {$interpolateProvider.startSymbol('{[{').endSymbol('}]}');});

phonecatApp.controller('PhoneListController', function PhoneListController($scope, $window, $http, object, poster,datasetter) {

    var baseUrl = $window.base;
    $scope.labels = ["Failed", "Passed", "Not Run", "Blocked", "Caution"];
    $scope.colors = ['#f47457', '#7eff7a', '#e0e0e0', '#f4f356', '#f29e56'];
    
    AP.resize(); 
    AP.require("_util", function(util) {
        
        //Getting project and issue key querystring params from host URL
        var hostString = util.decodeQueryComponent(window.location.href);
        var qs = URI(hostString).query(true);
        $scope.issueKey = qs['issueKey'];
        $scope.projectKey = qs['projectKey'];
        
        //requesting stored SpiraTeam API Acsess config from JIRA 
        AP.require(['request'], function(request) {
            request({url: baseUrl + '/rest/api/latest/project/' + $scope.projectKey + '/properties/spira',
                success: function(response) {
                    response = JSON.parse(response);
                    
                    //factory driven AJAX calls to get Spriteam Requirement data (objectmaker,poster,datasetter)
                    var requestdata = object.objectmaker(response,$scope.issueKey)
                    poster.postmaker($http, requestdata).then(function successCallback(response) {
                    $scope.data = datasetter.set(response)
                    }, function errorCallback(response) {
                        return response
                    });
                }
            });

        });

    });

});

phonecatApp.factory("object", function() {

    return {

        objectmaker: function(response, issueKey) {
            
            console.log(response)
            
         var apiKey =  response.value.apiKey 
         var dataMappingID = response.value.dataMappingID 
         var projectID = response.value.projectID
         var spiraURL = response.value.spiraURL
         var username = response.value.username;
            
            var url = spiraURL + '/Services/v5_0/RestService.svc/data-mappings/' + dataMappingID + '/artifacts/1/search';
        console.log(url)
            var reqUrl = spiraURL + '/Services/v5_0/RestService.svc/projects/' + projectID + '/requirements/'
            console.log(reqUrl)
            var preauth = username + ":" + apiKey
            console.log(preauth)
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

phonecatApp.factory("poster", function() {
    return {
        postmaker: function($http, requestdata, CoverageCountTotal, CoverageCountPassed, CoverageCountFailed, CoverageCountCaution, CoverageCountBlocked, callbackFn) {
            return $http({
                method: 'POST',
                url: '/spirateam',
                data: requestdata
            })
        }

    }
});

phonecatApp.factory("datasetter", function() {
    return {
        set: function(response){
            var notRun = response.data.CoverageCountTotal - (response.data.CoverageCountPassed + response.data.CoverageCountFailed + response.data.CoverageCountCaution + response.data.CoverageCountBlocked)
            return [response.data.CoverageCountFailed, response.data.CoverageCountPassed, notRun, response.data.CoverageCountBlocked, response.data.CoverageCountCaution]
        }

    }
});