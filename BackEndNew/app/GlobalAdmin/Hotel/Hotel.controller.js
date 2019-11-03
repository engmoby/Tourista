(function () {
    'use strict';

    angular
        .module('home')
        .controller('HotelController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'HotelResource', 'HotelPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', HotelController]);


    function HotelController($rootScope, blockUI, $scope, $filter, $translate,
        $state, HotelResource, HotelPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.totalCount = HotelPrepService.totalCount;
        $scope.HotelList = HotelPrepService; 
      console.log( $scope.HotelList);
        function refreshHotels() {

            blockUI.start("Loading..."); 
            
            var k = HotelResource.GetAllHotels({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.HotelList = results  
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
            refreshHotels();
        }
        blockUI.stop();
        
    }

})();
