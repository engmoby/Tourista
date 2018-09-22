(function () {
    angular
      .module('home')
        .factory('AboutResource', ['$resource', 'appCONSTANTS', AboutResource]) 

    function AboutResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'About/', {}, {
            GetAllAbout: { method: 'GET', url: appCONSTANTS.API_URL + 'About/GetAllAbout', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'About/EditAbout', useToken: true },
            getAbout: { method: 'GET', url: appCONSTANTS.API_URL + 'About/GetAboutById/:AboutId', useToken: true }
        })
    } 

}());
