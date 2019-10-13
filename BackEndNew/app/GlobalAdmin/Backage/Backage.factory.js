(function () {
    angular
      .module('home')
        .factory('BackageResource', ['$resource', 'appCONSTANTS', BackageResource]) 

    function BackageResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Backages/', {}, {
            GetAllBackages: { method: 'GET', url: appCONSTANTS.API_URL + 'Backages/GetAllBackages', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Backages/EditBackage', useToken: true },
            getBackage: { method: 'GET', url: appCONSTANTS.API_URL + 'Backages/GetBackageById/:BackageId', useToken: true }
        })
    } 

}());
