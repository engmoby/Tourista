(function () {
    'use strict';

    angular
        .module('home')
        .controller('NewsController', ['$rootScope', '$http', '$uibModal', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'NewsResource', 'NewsPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', NewsController]);


    function NewsController($rootScope, $http, $uibModal, blockUI, $scope, $filter, $translate,
        $state, NewsResource, NewsPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[14].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = NewsPrepService.totalCount;
        $scope.NewsList = NewsPrepService;
        function refreshNews() {

            blockUI.start("Loading...");

            var k = NewsResource.getAllNews({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.NewsList = results
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
            refreshNews();
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
            updateObj.newsId = obj.newsId;
            updateObj.titleDictionary = obj.titleDictionary;
            updateObj.descriptionDictionary = obj.descriptionDictionary;

            updateObj.isDeleted = true;

            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'News/EditNews',

                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    refreshNews();

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
