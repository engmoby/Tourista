(function () {
    angular
      .module('home')
        .factory('BackageReservationResource', ['$resource', 'appCONSTANTS', BackageReservationResource]) 

    function BackageReservationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'BackageReservations/', {}, {
            GetAllBackageReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'BackageReservations/GetAllBackageReservations', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'BackageReservations/EditBackageReservation', useToken: true },
            getBackageReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'BackageReservations/GetBackageReservationById/:BackageReservationId', useToken: true }
        })
    } 

}());
