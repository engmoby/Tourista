(function () {
    angular
      .module('home')
        .factory('OfferReservationResource', ['$resource', 'appCONSTANTS', OfferReservationResource]) 

    function OfferReservationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'OfferReservations/', {}, {
            GetAllOfferReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'OfferReservations/GetAllOfferReservations', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'OfferReservations/EditOfferReservation', useToken: true },
            getOfferReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'OfferReservations/GetOfferReservationById/:OfferReservationId', useToken: true }
        })
    } 

}());
