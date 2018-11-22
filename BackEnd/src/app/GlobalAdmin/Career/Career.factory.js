(function () {

    angular
        .module('home')
        .factory('CareerResource', ['$resource', 'appCONSTANTS', CareerResource])

    function CareerResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Careers/', {}, {
            getAllCareers: { method: 'GET', url: appCONSTANTS.API_URL + 'Careers/GetAllCareers', isArray: true, useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Careers/EditCareer', useToken: true },
            getCareer: { method: 'GET', url: appCONSTANTS.API_URL + 'Careers/GetCareerById/:CareerId', useToken: true }
        })
    }

}());
