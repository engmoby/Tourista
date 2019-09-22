(function () {
    'use strict';

    angular
        .module('home')
        .controller('CountryController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CountryResource', 'CountryPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', CountryController]);


    function CountryController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CountryResource, CountryPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.totalCount = CountryPrepService.totalCount;
        $scope.CountryList = CountryPrepService; 
      console.log( $scope.CountryList);
        function refreshCountrys() {

            blockUI.start("Loading..."); 
            
            var k = CountryResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.CountryList = results  
                blockUI.stop();
                
            },
            function (data, status) {
                blockUI.stop();
                
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }
        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshCountrys();
        }
        blockUI.stop();
        
    }

})();
