(function () {
    angular
      .module('home')
        .factory('TourReservationResource', ['$resource', 'appCONSTANTS', TourReservationResource]) 

    function TourReservationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'TourReservations/', {}, {
            GetAllTourReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'TourReservations/GetAllTourReservations', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'TourReservations/EditTourReservation', useToken: true },
            getTourReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'TourReservations/GetTourReservationById/:TourReservationId', useToken: true }
        })
    } 

}());
