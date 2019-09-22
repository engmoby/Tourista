(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('createCareerDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CareerResource', 'ToastService', '$rootScope', createCareerDialogController])

    function createCareerDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CareerResource,
        ToastService, $rootScope) {
        
        blockUI.start("Loading..."); 
            
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Career');
		} 
		 
		vm.AddNewCareer = function () {
            blockUI.start("Loading..."); 
            debugger;
            var newObj = new CareerResource();
     
            newObj.title = vm.title; 
            newObj.description= vm.description; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Career');
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
