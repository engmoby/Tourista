(function () {
    angular
      .module('home')
        .factory('FeatureResource', ['$resource', 'appCONSTANTS', FeatureResource]) 

    function FeatureResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Features/', {}, {
            getAllFeatures: { method: 'GET', url: appCONSTANTS.API_URL + 'Features/GetAllFeatures', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Features/EditFeature', useToken: true },
            getFeature: { method: 'GET', url: appCONSTANTS.API_URL + 'Features/GetFeatureById/:FeatureId', useToken: true }
        })
    } 

}());
