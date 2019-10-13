(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editTypeDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'TypeResource', 'ToastService',
            'TypeByIdPrepService', editTypeDialogController])

    function editTypeDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, TypeResource, ToastService, TypeByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Type = TypeByIdPrepService; 
        vm.Close = function () {
            $state.go('Type');
        }
        vm.UpdateType = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new TypeResource();
            updateObj.typeId = vm.Type.typeId;
            updateObj.titleDictionary = vm.Type.titleDictionary;
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Type');

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
