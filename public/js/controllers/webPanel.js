//app module defined with factory + library dependencies defined 
var spiraDisplayApp = angular.module('spiraDisplayApp', ["chart.js","object","poster","datasetter","WebPanelController"])
    //Config blocks for chartJS presentation + setting syntax for angular brackets 
    .config(function(ChartJsProvider) {ChartJsProvider.setOptions({responsive: false});})
    .config(function($interpolateProvider) {$interpolateProvider.startSymbol('{[{').endSymbol('}]}');});
//module + Controller both set named as "WebPanelController"
angular.module('WebPanelController', []).controller('WebPanelController', function WebPanelController($scope, $window, $http, object, poster,datasetter) {
    
    //base URL set form window object 
    var baseUrl = $window.base;
    
    //chartJS color scheme 
    $scope.labels = ["Failed", "Passed", "Not Run", "Blocked", "Caution"];
    $scope.colors = ['#f47457', '#7eff7a', '#e0e0e0', '#f4f356', '#f29e56'];
    
    ////Atlassian object: Makes iframe responsive
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
                    console.log(response)
                    
                    //factory driven AJAX calls to get Spriteam Requirement data (object,poster,datasetter)
                    var requestdata = object.objectmaker(response,$scope.issueKey)
                   
                    poster.postmaker($http, requestdata).then(function successCallback(response) {
                    $scope.data = datasetter.set(response)}, function errorCallback(response) {return response});
                }
            });
        });
    });
});




