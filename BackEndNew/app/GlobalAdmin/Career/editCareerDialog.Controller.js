(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editCareerDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
         'CareerResource', 'ToastService',            'CareerByIdPrepService', editCareerDialogController])

    function editCareerDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, 
        CareerResource, ToastService, CareerByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Career = CareerByIdPrepService; 
        console.log( vm.Career)
        vm.Close = function () {
            $state.go('Career');
        }
        vm.UpdateCareer = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new CareerResource();
            
            updateObj.title = vm.Career.title; 
            updateObj.description= vm.Career.description; 
            updateObj.careerId = vm.Career.careerId; 
		   // updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Career');

                },
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();
        
	}	
}());
