(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editInqueryDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
         'ContactFormResource', 'ToastService',            'InqueryByIdPrepService', editInqueryDialogController])

    function editInqueryDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, 
        ContactFormResource, ToastService, InqueryByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Inquery = InqueryByIdPrepService; 
        console.log( vm.Inquery)
        vm.Close = function () {
            $state.go('Inquery');
        }
        vm.UpdateInquery = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new ContactFormResource();
            
            updateObj.title = vm.Inquery.title; 
            updateObj.description= vm.Inquery.description; 
            updateObj.InqueryId = vm.Inquery.InqueryId; 
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Inquery');

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
