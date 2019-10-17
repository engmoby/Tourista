(function () {
    angular
      .module('home')
        .factory('OfferResource', ['$resource', 'appCONSTANTS', OfferResource]) 

    function OfferResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Offers/', {}, {
            GetAllOffers: { method: 'GET', url: appCONSTANTS.API_URL + 'Offers/GetAllOffers', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Offers/EditOffer', useToken: true },
            getOffer: { method: 'GET', url: appCONSTANTS.API_URL + 'Offers/GetOfferById/:OfferId', useToken: true }
        })
    } 

}());
