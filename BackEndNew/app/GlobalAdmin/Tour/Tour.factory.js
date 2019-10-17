(function () {
    angular
      .module('home')
        .factory('TourResource', ['$resource', 'appCONSTANTS', TourResource]) 

    function TourResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Tours/', {}, {
            GetAllTours: { method: 'GET', url: appCONSTANTS.API_URL + 'Tours/GetAllTours', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Tours/EditTour', useToken: true },
            getTour: { method: 'GET', url: appCONSTANTS.API_URL + 'Tours/GetTourById/:TourId', useToken: true }
        })
    } 

}());
