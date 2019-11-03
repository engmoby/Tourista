(function () {
    'use strict';

    angular
        .module('home')
        .controller('OfferController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'OfferResource', 'OfferPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', OfferController]);


    function OfferController($rootScope, blockUI, $scope, $filter, $translate,
        $state, OfferResource, OfferPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[12].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = OfferPrepService.totalCount;
        $scope.OfferList = OfferPrepService;
        console.log($scope.OfferList);
        function refreshOffers() {

            blockUI.start("Loading...");

            var k = OfferResource.GetAllOffers({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.OfferList = results
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
            refreshOffers();
        }
        blockUI.stop();

    }

})();
