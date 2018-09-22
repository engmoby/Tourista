(function () {
    angular
      .module('home')
        .factory('HotelReservationResource', ['$resource', 'appCONSTANTS', HotelReservationResource]) 

    function HotelReservationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'HotelReservations/', {}, {
            GetAllHotelReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'HotelReservations/GetAllHotelReservations', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'HotelReservations/EditHotelReservation', useToken: true },
            getHotelReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'HotelReservations/GetHotelReservationById/:HotelReservationId', useToken: true }
        })
    } 

}());
