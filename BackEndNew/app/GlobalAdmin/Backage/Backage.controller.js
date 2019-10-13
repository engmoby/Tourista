(function () {
    'use strict';

    angular
        .module('home')
        .controller('BackageController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'BackageResource', 'BackagePrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', BackageController]);


    function BackageController($rootScope, blockUI, $scope, $filter, $translate,
        $state, BackageResource, BackagePrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = BackagePrepService.totalCount;
        $scope.BackageList = BackagePrepService;
        console.log($scope.BackageList);
        function refreshBackages() {

            blockUI.start("Loading...");

            var k = BackageResource.GetAllBackages({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.BackageList = results
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
            refreshBackages();
        }
        blockUI.stop();

    }

})();
