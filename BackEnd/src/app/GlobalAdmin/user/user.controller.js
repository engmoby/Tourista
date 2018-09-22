(function () {
    'use strict';

    angular
        .module('home')
        .controller('userController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate', '$state', 'UserResource',  
            'userPrepService',   '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', userController]);

    function userController($rootScope, blockUI, $scope, $filter, $translate, $state, UserResource,    userPrepService, 
          $localStorage, authorizationService, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[7].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = userPrepService.totalCount;
        $scope.userList = userPrepService.results; 
        console.log($scope.userList);

        $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
        $scope.userObj = "";
        $scope.selectedType = ""; 
        $scope.userTypeList = appCONSTANTS.UserType;
       
        function refreshUsers() {
            blockUI.start("Loading...");

            var k = UserResource.getAllUsers({ page: vm.currentPage }).$promise.then(function (results) {
                vm.getPageData = results;
                $scope.userList = vm.getPageData.results;
                console.log($scope.userList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

       

        $scope.AddNewclient = function () {
            blockUI.start("Loading...");

            var newClient = new UserResource(); 
            newClient.Fullname = $scope.fullName; 
            newClient.Title = $scope.title; 
            newClient.Phone = $scope.Phone;
            newClient.WhatsApp = $scope.whatsApp;
            newClient.Email = $scope.Email;
            newClient.Password = $scope.Password;
            newClient.UserType = $scope.selectedType;
            newClient.IsDeleted = false;
            newClient.IsSystemUser = true;

            newClient.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");

                    localStorage.setItem('data', JSON.stringify(data.userId));
                    $state.go('users');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }

        blockUI.stop();

    }

}());