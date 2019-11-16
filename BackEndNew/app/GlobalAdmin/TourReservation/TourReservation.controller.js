
(function () {
    'use strict';

    angular
        .module('home')
        .controller('TourReservationController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'TourReservationResource', 'TourReservationPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', TourReservationController]);


    function TourReservationController($rootScope, blockUI, $scope, $filter, $translate,
        $state, TourReservationResource, TourReservationPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.StatusList = appCONSTANTS.Status;
        $scope.totalCount = TourReservationPrepService.totalCount;
        $scope.TourReservationList = TourReservationPrepService; 
      console.log( $scope.TourReservationList);
        function refreshTourReservations() {

            blockUI.start("Loading..."); 
            
            var k = TourReservationResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.TourReservationList = results  
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
            refreshTourReservations();
        }
        blockUI.stop();
        
    }

})();
