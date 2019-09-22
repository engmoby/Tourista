(function () {
    'use strict';

    angular
        .module('home')
        .controller('OwnerController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'OwnerResource', 'OwnerPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', OwnerController]);


    function OwnerController($rootScope, blockUI, $scope, $filter, $translate,
        $state, OwnerResource, OwnerPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.totalCount = OwnerPrepService.totalCount;
        $scope.OwnerList = OwnerPrepService;
        function refreshOwners() {

            blockUI.start("Loading..."); 
            
            var k = OwnerResource.getAllOwners({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.OwnerList = results  
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
            refreshOwners();
        }
        blockUI.stop();
        
    }

})();
