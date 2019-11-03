
(function () {
    'use strict';

    angular
        .module('home')
        .controller('BackageReservationController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'BackageReservationResource', 'BackageReservationPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', BackageReservationController]);


    function BackageReservationController($rootScope, blockUI, $scope, $filter, $translate,
        $state, BackageReservationResource, BackageReservationPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.StatusList = appCONSTANTS.Status;
        $scope.totalCount = BackageReservationPrepService.totalCount;
        $scope.BackageReservationList = BackageReservationPrepService; 
      console.log( $scope.BackageReservationList);
        function refreshBackageReservations() {

            blockUI.start("Loading..."); 
            
            var k = BackageReservationResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.BackageReservationList = results  
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
            refreshBackageReservations();
        }
        blockUI.stop();
        
    }

})();
