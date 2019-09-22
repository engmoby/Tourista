(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editOwnerDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'OwnerResource', 'ToastService',
            'OwnerByIdPrepService', editOwnerDialogController])

    function editOwnerDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, OwnerResource, ToastService, OwnerByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Owner = OwnerByIdPrepService; 
        console.log( vm.Owner);
        vm.Close = function () {
            $state.go('Owner');
        }
        vm.UpdateOwner = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new OwnerResource();
            updateObj.ownerId = vm.Owner.ownerId;
            updateObj.titleDictionary = vm.Owner.titleDictionary;
            updateObj.postionDictionary = vm.Owner.postionDictionary; 
            updateObj.descriptionDictionary = vm.Owner.descriptionDictionary;  
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Owner');

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
