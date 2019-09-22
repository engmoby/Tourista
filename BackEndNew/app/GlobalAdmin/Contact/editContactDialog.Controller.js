(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editContactDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'ContactResource', 'ToastService',
            'ContactByIdPrepService', editContactDialogController])

    function editContactDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ContactResource, ToastService, ContactByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Contact = ContactByIdPrepService; 
      console.log( vm.Contact);
        vm.Close = function () {
            $state.go('Contact');
        }
        vm.UpdateContact = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new ContactResource();
            updateObj.contactUsId = vm.Contact.contactUsId;
            updateObj.addressDictionary = vm.Contact.addressDictionary; 
            updateObj.mail = vm.Contact.mail; 
            updateObj.fax = vm.Contact.fax; 
            updateObj.phone = vm.Contact.phone; 
            updateObj.facebook = vm.Contact.facebook; 
            updateObj.instgram = vm.Contact.instgram; 
            updateObj.twitter = vm.Contact.twitter; 
            updateObj.linkedIn = vm.Contact.linkedIn; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Contact');

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
