(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('createOwnerDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'OwnerResource', 'ToastService', '$rootScope', createOwnerDialogController])

    function createOwnerDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, OwnerResource,
        ToastService, $rootScope) {
        
        blockUI.start("Loading..."); 
            
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Owner');
		} 
		 
		vm.AddNewOwner = function () {
            blockUI.start("Loading..."); 
            
            var newObj = new OwnerResource();
            newObj.titleDictionary = vm.titleDictionary; 
            newObj.postionDictionary = vm.postionDictionary; 
            newObj.descriptionDictionary = vm.descriptionDictionary; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Owner');
                     blockUI.stop();        


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
