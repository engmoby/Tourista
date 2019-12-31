(function () {
    'use strict';

    angular
        .module('home')
        .controller('BackageController', ['$rootScope', '$http', '$uibModal', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'BackageResource', 'BackagePrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', BackageController]);


    function BackageController($rootScope, $http, $uibModal, blockUI, $scope, $filter, $translate,
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
            var updateObj = new Object();
            updateObj.backageId = obj.backageId;
            updateObj.titleDictionary = obj.titleDictionary;
            updateObj.descriptionDictionary = obj.descriptionDictionary;
            updateObj.cityId = obj.cityId;
            updateObj.daysCount = obj.daysCount;
            updateObj.nigthsCount = obj.nigthsCount;
            updateObj.price = obj.price;
            updateObj.currencyId = obj.currencyId;
            updateObj.typeId = obj.typeId;
            updateObj.isDeleted = true;

            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Backages/EditBackage',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    refreshBackages();

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    blockUI.stop();
                }
            );
        }
    }

})();
