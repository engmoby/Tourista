(function () {
    
    angular
      .module('home')
        .factory('ContactFormResource', ['$resource', 'appCONSTANTS', ContactFormResource]) 

    function ContactFormResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'ContactForms/', {}, {
            getAllInquerys: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactForms/GetAllContactForms', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'ContactForms/EditContactForm', useToken: true },
            getContactForm: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactForms/GetContactFormById/:ContactFormId', useToken: true }
        })
    } 

}());
