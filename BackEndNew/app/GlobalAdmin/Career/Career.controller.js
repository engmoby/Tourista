(function () {
    'use strict';

    angular
        .module('home')
        .controller('CareerController', ['$rootScope', '$http', '$uibModal', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CareerResource', 'CareerPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', CareerController]);


    function CareerController($rootScope, $http, $uibModal, blockUI, $scope, $filter, $translate,
        $state, CareerResource, CareerPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[10].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = CareerPrepService.totalCount;
        $scope.CareerList = CareerPrepService;
        console.log($scope.CareerList);
        function refreshCareers() {

            blockUI.start("Loading...");

            var k = CareerResource.getAllCareers({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.CareerList = results
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
            refreshCareers();
        }
        blockUI.stop();
        vm.openDeleteDialog = function (model, name, id) {
            debugger;
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        function confirmationDelete(obj) {

            debugger;
            blockUI.start("Loading...");
            var updateObj = new CareerResource();

            updateObj.title = obj.title;
            updateObj.description = obj.description;
            updateObj.careerId = obj.careerId;
            updateObj.isDeleted = true;
            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    refreshCareers();

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );


        }
    }

})();
