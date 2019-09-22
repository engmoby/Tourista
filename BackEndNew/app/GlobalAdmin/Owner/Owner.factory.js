(function () {
    
    angular
      .module('home')
        .factory('OwnerResource', ['$resource', 'appCONSTANTS', OwnerResource]) 

    function OwnerResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Owners/', {}, {
            getAllOwners: { method: 'GET', url: appCONSTANTS.API_URL + 'Owners/GetAllOwners', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Owners/EditOwner', useToken: true },
            getOwner: { method: 'GET', url: appCONSTANTS.API_URL + 'Owners/GetOwnerById/:OwnerId', useToken: true }
        })
    } 

}());
