(function () {
    'use strict';

    angular
        .module('home')
        .controller('CityController', ['$rootScope', '$scope', '$filter', '$translate',
            '$state', 'CityResource',   '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', CityController]);


    function CityController($rootScope, $scope, $filter, $translate,
        $state, CityResource,  $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        blockUI.start("Loading..."); 
            
        refreshCitys();

        function refreshCitys() {
           blockUI.start("Loading..."); 
            
            var k = CityResource.getAllCitys().$promise.then(function (results) {
                $scope.CityList = results;
                blockUI.stop();
                
            },
            function (data, status) {
                blockUI.stop();
                
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }

    }

})();
