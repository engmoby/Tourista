(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('createCityDialogController', ['$scope', '$http', '$state', 'appCONSTANTS', '$translate',
            'CityResource', 'ToastService', '$rootScope', 'CountryByIdPrepService', createCityDialogController])

    function createCityDialogController($scope, $http, $state, appCONSTANTS, $translate, CityResource,
        ToastService, $rootScope, CountryByIdPrepService) {
		var vm = this;
		vm.Country = CountryByIdPrepService;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
		    $state.go('Country');
		} 
		 
		vm.AddNewCity = function () {
            var newObj = new CityResource();
		    newObj.countryId = vm.Country.countryId;
            newObj.titleDictionary = vm.titleDictionary;
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Country');

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
  
	}	
}());
