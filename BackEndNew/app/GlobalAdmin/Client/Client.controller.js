(function () {
    'use strict';

    angular
        .module('home')
        .controller('ClientController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate', '$state', 'ClientResource',  
            'ClientPrepService',   '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', ClientController]);

    function ClientController($rootScope, blockUI, $scope, $filter, $translate, $state, ClientResource,    ClientPrepService, 
          $localStorage, authorizationService, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[8].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = ClientPrepService.totalCount;
        $scope.ClientList = ClientPrepService.results;  
console.log( $scope.ClientList);
        $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
        $scope.ClientObj = "";
        $scope.selectedType = ""; 
        $scope.ClientTypeList = appCONSTANTS.ClientType;
       
        function refreshClients() {
            blockUI.start("Loading...");

            var k = ClientResource.getAllClients({ page: vm.currentPage }).$promise.then(function (results) {
                vm.getPageData = results;
                $scope.ClientList = vm.getPageData.results; 
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

       

        $scope.AddNewclient = function () {
            blockUI.start("Loading...");

            var newClient = new ClientResource(); 
            newClient.Fullname = $scope.fullName; 
            newClient.Title = $scope.title; 
            newClient.Phone = $scope.Phone;
            newClient.WhatsApp = $scope.whatsApp;
            newClient.Email = $scope.Email;
            newClient.Password = $scope.Password;
            newClient.ClientType = $scope.selectedType;
            newClient.IsDeleted = false;
            newClient.IsSystemClient = true;

            newClient.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");

                    localStorage.setItem('data', JSON.stringify(data.ClientId));
                    $state.go('Clients');

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
            refreshClients();
        }

        blockUI.stop();

    }

}());