(function () {
    angular
      .module('home')
        .factory('CurrencyResource', ['$resource', 'appCONSTANTS', CurrencyResource]) 

    function CurrencyResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Currencies/', {}, {
            getAllCurrencies: { method: 'GET', url: appCONSTANTS.API_URL + 'Currencies/GetAllCurrencies', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Currencies/EditCurrency', useToken: true },
            getCurrency: { method: 'GET', url: appCONSTANTS.API_URL + 'Currencies/GetCurrencyById/:CurrencyId', useToken: true }
        })
    } 

}());
