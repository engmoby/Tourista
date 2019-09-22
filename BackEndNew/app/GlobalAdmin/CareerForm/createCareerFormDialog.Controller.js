(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('createCareerFormDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CareerFormResource', 'ToastService', '$rootScope', createCareerFormDialogController])

    function createCareerFormDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CareerFormResource,
        ToastService, $rootScope) {
        
        blockUI.start("Loading..."); 
            
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('CareerForm');
		} 
		 
		vm.AddNewCareerForm = function () {
            blockUI.start("Loading..."); 
            debugger;
            var newObj = new CareerFormResource();
     
            newObj.title = vm.title; 
            newObj.description= vm.description; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('CareerForm');
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
