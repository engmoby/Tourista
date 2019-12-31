(function () {
    'use strict';

    angular
        .module('home')
        .controller('TourController', ['$rootScope',  '$http', '$uibModal', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'TourResource', 'TourPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', TourController]);


    function TourController($rootScope,  $http, $uibModal,blockUI, $scope, $filter, $translate,
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
            updateObj.tourId = obj.tourId;
            updateObj.titleDictionary = obj.titleDictionary;
            updateObj.descriptionDictionary = obj.descriptionDictionary;
            updateObj.star = obj.star;
            updateObj.mekkaDays = obj.mekkaDays; 
            updateObj.madinaDays = obj.madinaDays; 
            updateObj.duration = obj.duration; 
            updateObj.price = obj.price; 
            updateObj.startFrom =  obj.startFrom;
            updateObj.startTo =  obj.startTo;
            updateObj.hotelTitle = obj.hotelTitle;
            updateObj.currencyId = obj.currencyId; 
            updateObj.isDeleted = true;

            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Tours/EditTour',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    refreshTours();

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
