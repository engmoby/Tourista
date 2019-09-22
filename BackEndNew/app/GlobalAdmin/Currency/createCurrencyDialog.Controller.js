(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('createCurrencyDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CurrencyResource', 'ToastService', '$rootScope', createCurrencyDialogController])

    function createCurrencyDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CurrencyResource,
        ToastService, $rootScope) {
        
        blockUI.start("Loading..."); 
            
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Currency');
		} 
		 
		vm.AddNewCurrency = function () {
            blockUI.start("Loading..."); 
            
            var newObj = new CurrencyResource();
            newObj.titleDictionary = vm.titleDictionary; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Currency');
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
