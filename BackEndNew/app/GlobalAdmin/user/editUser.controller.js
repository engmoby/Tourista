(function () {
    'use strict';

    angular
        .module('home')
    //     .controller('editUserController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate', '$state', 'UserResource',
    //        'appCONSTANTS',  'EditUserPrepService', 'ToastService',
    //          , editUserController]);


    // function editUserController($rootScope, blockUI, $scope, $filter, $translate, $state, UserResource,  appCONSTANTS,
    //     EditUserPrepService, ToastService ) {
            .controller('editUserController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate', '$state', 'UserResource',  
            'userPrepService',  'EditUserPrepService', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', editUserController]);

    function editUserController($rootScope, blockUI, $scope, $filter, $translate, $state, UserResource,    userPrepService, EditUserPrepService,
          $localStorage, authorizationService, appCONSTANTS, ToastService) {

        blockUI.start("Loading...");

        $scope.isPaneShown = true;
        $scope.$emit('LOAD')
        var vm = this;
        
 
        vm.show = true;  
        $scope.userObj = EditUserPrepService;
        $scope.userObj.confirmPassword = $scope.userObj.password;
        $scope.userTypeList = appCONSTANTS.UserType;
 
        $scope.selectedType = "";
        console.log($scope.userObj);
       
        var indexType = $scope.userTypeList.indexOf($filter('filter')($scope.userTypeList, { 'id': $scope.userObj.userType }, true)[0]);
        $scope.selectedType=$scope.userTypeList[indexType]; 
      

 

        $scope.Updateclient = function () {
            blockUI.start("Loading..."); 
            var updateClient = new UserResource();
            updateClient.UserId = $scope.userObj.userId;
            updateClient.Fullname = $scope.userObj.fullName; 
            updateClient.Title = $scope.userObj.title; 
            updateClient.Phone = $scope.userObj.phone;
            updateClient.WhatsApp = $scope.userObj.whatsApp;
            updateClient.Email = $scope.userObj.email;
            updateClient.Password = $scope.userObj.password;
            updateClient.IsDeleted = false; 
            updateClient.UserType = $scope.selectedType.id; 
            updateClient.$update().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    $state.go('users');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();


    }

})();