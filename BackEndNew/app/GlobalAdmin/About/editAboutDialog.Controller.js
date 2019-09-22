(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editAboutDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'AboutResource', 'ToastService',
            'AboutByIdPrepService', editAboutDialogController])

    function editAboutDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, AboutResource, ToastService, AboutByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.About = AboutByIdPrepService; 
      console.log( vm.About);
        vm.Close = function () {
            $state.go('About');
        }
        vm.UpdateAbout = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new AboutResource();
            updateObj.aboutId = vm.About.aboutId;
            updateObj.descriptionDictionary = vm.About.descriptionDictionary; 
            updateObj.videoUrl = vm.About.videoUrl; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('About');

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
