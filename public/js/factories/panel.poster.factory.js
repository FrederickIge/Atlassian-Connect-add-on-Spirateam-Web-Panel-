spiraDisplayApp.factory("poster", function() {
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