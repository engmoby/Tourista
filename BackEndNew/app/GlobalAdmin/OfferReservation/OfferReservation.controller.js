
(function () {
    'use strict';

    angular
        .module('home')
        .controller('OfferReservationController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'OfferReservationResource', 'OfferReservationPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', OfferReservationController]);


    function OfferReservationController($rootScope, blockUI, $scope, $filter, $translate,
        $state, OfferReservationResource, OfferReservationPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.StatusList = appCONSTANTS.Status;
        $scope.totalCount = OfferReservationPrepService.totalCount;
        $scope.OfferReservationList = OfferReservationPrepService; 
      console.log( $scope.OfferReservationList);
        function refreshOfferReservations() {

            blockUI.start("Loading..."); 
            
            var k = OfferReservationResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.OfferReservationList = results  
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
            refreshOfferReservations();
        }
        blockUI.stop();
        
    }

})();
