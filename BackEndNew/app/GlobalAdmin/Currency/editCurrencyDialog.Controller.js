(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editCurrencyDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'CurrencyResource', 'ToastService',
            'CurrencyByIdPrepService', editCurrencyDialogController])

    function editCurrencyDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CurrencyResource, ToastService, CurrencyByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Currency = CurrencyByIdPrepService; 
        vm.Close = function () {
            $state.go('Currency');
        }
        vm.UpdateCurrency = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new CurrencyResource();
            updateObj.currencyId = vm.Currency.currencyId;
            updateObj.titleDictionary = vm.Currency.titleDictionary;
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Currency');

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
