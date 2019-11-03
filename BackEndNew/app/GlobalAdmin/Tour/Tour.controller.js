(function () {
    'use strict';

    angular
        .module('home')
        .controller('TourController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'TourResource', 'TourPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', TourController]);


    function TourController($rootScope, blockUI, $scope, $filter, $translate,
        $state, TourResource, TourPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = TourPrepService.totalCount;
        $scope.TourList = TourPrepService;
        console.log($scope.TourList);
        function refreshTours() {

            blockUI.start("Loading...");

            var k = TourResource.GetAllTours({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.TourList = results
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
            refreshTours();
        }
        blockUI.stop();

    }

})();
