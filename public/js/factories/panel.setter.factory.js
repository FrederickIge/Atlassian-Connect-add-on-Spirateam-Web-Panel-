angular.module("datasetter", []).factory("datasetter", function() {
    return {
        set: function(response){
            var notRun = response.data.CoverageCountTotal - (response.data.CoverageCountPassed + response.data.CoverageCountFailed + response.data.CoverageCountCaution + response.data.CoverageCountBlocked)
            return [response.data.CoverageCountFailed, response.data.CoverageCountPassed, notRun, response.data.CoverageCountBlocked, response.data.CoverageCountCaution]
        }

    }
});