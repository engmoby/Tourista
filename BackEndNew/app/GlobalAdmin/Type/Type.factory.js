(function () {
    angular
      .module('home')
        .factory('TypeResource', ['$resource', 'appCONSTANTS', TypeResource]) 

    function TypeResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Types/', {}, {
            getAllTypes: { method: 'GET', url: appCONSTANTS.API_URL + 'Types/GetAllTypes', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Types/EditType', useToken: true },
            getType: { method: 'GET', url: appCONSTANTS.API_URL + 'Types/GetTypeById/:TypeId', useToken: true }
        })
    } 

}());
