(function () {
    angular
      .module('home')
        .factory('HotelResource', ['$resource', 'appCONSTANTS', HotelResource]) 

    function HotelResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Hotels/', {}, {
            GetAllHotels: { method: 'GET', url: appCONSTANTS.API_URL + 'Hotels/GetAllHotels', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Hotels/EditHotel', useToken: true },
            getHotel: { method: 'GET', url: appCONSTANTS.API_URL + 'Hotels/GetHotelById/:HotelId', useToken: true }
        })
    } 

}());
