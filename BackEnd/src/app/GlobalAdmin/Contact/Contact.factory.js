(function () {
    angular
      .module('home')
        .factory('ContactResource', ['$resource', 'appCONSTANTS', ContactResource]) 

    function ContactResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Contact/', {}, {
            GetAllContact: { method: 'GET', url: appCONSTANTS.API_URL + 'Contact/GetAllContact', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Contact/EditContact', useToken: true },
            getContact: { method: 'GET', url: appCONSTANTS.API_URL + 'Contact/GetContactById/:ContactId', useToken: true }
        })
    } 

}());
