(function () {
    'use strict';

    angular
        .module('home')
        .controller('OfferController', ['$rootScope', '$http', '$uibModal', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'OfferResource', 'OfferPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', OfferController]);


    function OfferController($rootScope, $http, $uibModal, blockUI, $scope, $filter, $translate,
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
            updateObj.offerId = obj.offerId;
            updateObj.titleDictionary = obj.titleDictionary;
            updateObj.descriptionDictionary = obj.descriptionDictionary;
            updateObj.star = obj.star;
            updateObj.cityId = obj.cityId;
            updateObj.removeImages = obj.RemoveImages;
            updateObj.daysCount = obj.daysCount;
            updateObj.nigthsCount = obj.nigthsCount;
            updateObj.priceBefore = obj.priceBefore;
            updateObj.price = obj.price;
            updateObj.hotelId = obj.hotelId;
            updateObj.typeId = obj.typeId;
            updateObj.currencyId = obj.currencyId;

            updateObj.dateFrom = obj.dateFrom;
            updateObj.dateTo = obj.dateTo;
            updateObj.isDeleted = true;

            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Offers/EditOffer',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    refreshOffers();

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
