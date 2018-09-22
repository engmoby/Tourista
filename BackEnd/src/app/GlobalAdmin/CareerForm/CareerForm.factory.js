(function () {
    
    angular
      .module('home')
        .factory('CareerFormResource', ['$resource', 'appCONSTANTS', CareerFormResource]) 

    function CareerFormResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'CareerForms/', {}, {
            getAllCareerForms: { method: 'GET', url: appCONSTANTS.API_URL + 'CareerForms/GetAllCareerForms', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'CareerForms/EditCareerForm', useToken: true },
            getCareerForm: { method: 'GET', url: appCONSTANTS.API_URL + 'CareerForms/GetCareerFormById/:CareerFormId', useToken: true }
        })
    } 

}());
