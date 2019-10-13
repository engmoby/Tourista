(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('createTypeDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'TypeResource', 'ToastService', '$rootScope', createTypeDialogController])

    function createTypeDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, TypeResource,
        ToastService, $rootScope) {
        
        blockUI.start("Loading..."); 
            
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Type');
		} 
		 
		vm.AddNewType = function () {
            blockUI.start("Loading..."); 
            
            var newObj = new TypeResource();
            newObj.titleDictionary = vm.titleDictionary; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Type');
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
