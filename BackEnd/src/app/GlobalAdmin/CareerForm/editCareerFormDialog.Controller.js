(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editCareerFormDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
         'CareerFormResource', 'ToastService',            'CareerFormByIdPrepService', editCareerFormDialogController])

    function editCareerFormDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, 
        CareerFormResource, ToastService, CareerFormByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.CareerForm = CareerFormByIdPrepService; 
        console.log( vm.CareerForm)
        vm.Close = function () {
            $state.go('CareerForm');
        }
        vm.UpdateCareerForm = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new CareerFormResource();
            
            updateObj.title = vm.CareerForm.title; 
            updateObj.description= vm.CareerForm.description; 
            updateObj.CareerFormId = vm.CareerForm.CareerFormId; 
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('CareerForm');

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
