
angular.module("object", []).factory("object", function() {
    return {

        objectmaker: function(response, issueKey) {
            
            
            response = JSON.parse(response);
         var apiKey =  response.value.apiKey 
         var dataMappingID = response.value.dataMappingID 
         var projectID = response.value.projectID
         var spiraURL = response.value.spiraURL
         var username = response.value.username;
            
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
            
            return requestdata
        }
    }
});


