(function () {
    angular
      .module('home')
        .factory('NewsResource', ['$resource', 'appCONSTANTS', NewsResource]) 

    function NewsResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'News/', {}, {
            getAllNews: { method: 'GET', url: appCONSTANTS.API_URL + 'News/GetAllNews', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'News/EditNews', useToken: true },
            getNews: { method: 'GET', url: appCONSTANTS.API_URL + 'News/GetNewsById/:NewsId', useToken: true }
        })
    } 

}());
