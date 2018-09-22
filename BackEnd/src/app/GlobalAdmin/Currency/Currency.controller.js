(function () {
    'use strict';

    angular
        .module('home')
        .controller('CurrencyController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CurrencyResource', 'CurrencyPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', CurrencyController]);


    function CurrencyController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CurrencyResource, CurrencyPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.totalCount = CurrencyPrepService.totalCount;
        $scope.CurrencyList = CurrencyPrepService;
        function refreshCurrencys() {

            blockUI.start("Loading..."); 
            
            var k = CurrencyResource.getAllCurrencies({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.CurrencyList = results  
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
            refreshCurrencys();
        }
        blockUI.stop();
        
    }

})();
