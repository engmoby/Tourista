
(function () {
    'use strict';

    angular
        .module('home')
        .controller('HotelReservationController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'HotelReservationResource', 'HotelReservationPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', HotelReservationController]);


    function HotelReservationController($rootScope, blockUI, $scope, $filter, $translate,
        $state, HotelReservationResource, HotelReservationPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[8].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.StatusList = appCONSTANTS.Status;
        $scope.totalCount = HotelReservationPrepService.totalCount;
        $scope.HotelReservationList = HotelReservationPrepService; 
      console.log( $scope.HotelReservationList);
        function refreshHotelReservations() {

            blockUI.start("Loading..."); 
            
            var k = HotelReservationResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.HotelReservationList = results  
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
            refreshHotelReservations();
        }
        blockUI.stop();
        
    }

})();
