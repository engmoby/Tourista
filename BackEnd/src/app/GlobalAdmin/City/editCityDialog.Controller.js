(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editCityDialogController', ['$scope', '$http', '$state', 'appCONSTANTS', '$translate', 'CityResource', 'ToastService',
            'CityByIdPrepService', editCityDialogController])

    function editCityDialogController($scope, $http, $state, appCONSTANTS, $translate, CityResource, ToastService, CityByIdPrepService) {
		var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.City = CityByIdPrepService; 
        vm.close = function () {
            $state.go('Country');
        }
        vm.UpdateCity = function () { 
            var updateObj = new CityResource();
            updateObj.cityId = vm.City.cityId;
            updateObj.titleDictionary = vm.City.titleDictionary;
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Country');

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
	}	
}());
