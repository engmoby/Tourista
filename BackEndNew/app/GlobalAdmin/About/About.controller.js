(function () {
    'use strict';

    angular
        .module('home')
        .controller('AboutController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'AboutResource', 'AboutPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', AboutController]); 
    function AboutController($rootScope, blockUI, $scope, $filter, $translate,
        $state, AboutResource, AboutPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[14].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = AboutPrepService.totalCount;
        $scope.AboutList = AboutPrepService;
        console.log($scope.AboutList);
        function refreshAbouts() {

            blockUI.start("Loading...");

            var k = AboutResource.GetAllCountries({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.AboutList = results
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
            refreshAbouts();
        }
        blockUI.stop();

    }

})();
