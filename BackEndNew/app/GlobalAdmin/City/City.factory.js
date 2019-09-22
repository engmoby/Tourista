(function () {
    angular
      .module('home')
        .factory('CityResource', ['$resource', 'appCONSTANTS', CityResource]) 

    function CityResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Cities/', {}, {
            getAllCities: { method: 'GET', url: appCONSTANTS.API_URL + 'Cities/GetAllCities', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Cities/EditCity', useToken: true },
            getCity: { method: 'GET', url: appCONSTANTS.API_URL + 'Cities/GetCityById/:CityId', useToken: true }
        })
    } 

}());
