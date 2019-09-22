(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editHotelDialogController', ['$scope', '$filter','blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
        'CountryPrepService',    'HotelResource', 'ToastService', 'FeaturePrepService', 'HotelByIdPrepService', editHotelDialogController])

    function editHotelDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate,CountryPrepService,
         HotelResource, ToastService,FeaturePrepService, HotelByIdPrepService) {
        blockUI.start("Loading..."); 
        function init(){ 
            $scope.CountryList = []; 
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results) 
            $scope.FeatureList = FeaturePrepService.results;
           
            $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
        }
        init();
        $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
            var location = $scope.autocomplete.getPlace().geometry.location;
           vm.Hotel.latitude = location.lat();
           vm.Hotel.longitude = location.lng();
            $scope.$apply();
        });

        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Hotel = HotelByIdPrepService; 
        vm.RemoveImages = []; 
        vm.CheckImages = []; 
        vm.selectedHotelFeatures=[] ;
        console.log( vm.Hotel);
        vm.CheckImages.push(vm.Hotel.imagesURL);
        var i;
        for (i = 0; i < vm.Hotel.hotelFeature.length; i++) {
            var indexFeature = $scope.FeatureList.indexOf($filter('filter')($scope.FeatureList, { 'featureId': vm.Hotel.hotelFeature[i].featureId }, true)[0]);
            vm.selectedHotelFeatures.push($scope.FeatureList[indexFeature]);

        }


      var indexCountry = $scope.CountryList.indexOf($filter('filter')($scope.CountryList, { 'countryId': vm.Hotel.city.countryId }, true)[0]);
      $scope.selectedCountry=$scope.CountryList[indexCountry];

      
      $scope.CityList = $scope.selectedCountry.cityes;
  var indexCity = $scope.selectedCountry.cityes.indexOf($filter('filter')($scope.selectedCountry.cityes, { 'cityId': vm.Hotel.city.cityId }, true)[0]);
  $scope.selectedCity=$scope.selectedCountry.cityes[indexCity];  

  $scope.CountryChange = function () {
    /*$scope.CountryList.splice(0, 1);*/
    for (var i = $scope.CountryList.length - 1; i >= 0; i--) {
        if ($scope.CountryList[i].CountryId == 0) {
            $scope.CountryList.splice(i, 1);
        }
    }
    $scope.CityList = [];
    $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
    $scope.CityList.push($scope.selectedCity);
    $scope.CityList = $scope.CityList.concat($scope.selectedCountry.cityes);
} 

        vm.Close = function () {
            $state.go('Hotel');
        } 
        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.UpdateHotel = function () {
            debugger;
        blockUI.start("Loading..."); 
        vm.isChanged = true;
            var updateObj = new Object();
            updateObj.hotelId = vm.Hotel.hotelId; 
            updateObj.titleDictionary = vm.Hotel.titleDictionary; 
            updateObj.descriptionDictionary = vm.Hotel.descriptionDictionary; 
            updateObj.star = vm.Hotel.star; 
            updateObj.cityId =  $scope.selectedCity.cityId; 
            updateObj.latitude =  vm.Hotel.latitude; 
            updateObj.longitude =  vm.Hotel.longitude; 
            updateObj.removeImages =  vm.RemoveImages; 
            updateObj.hotelFeature = vm.selectedHotelFeatures;
        
            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Hotels/EditHotel',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                   
                    blockUI.stop();
                     $state.go('Hotel')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        blockUI.stop();
    }
                );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.UpdateHotelForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            vm.CheckImages.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
           vm.RemoveImages.push(index);
            vm.files.splice(index, 1);
            vm.CheckImages.splice(index, 1);
        }
	
        vm.removeHotelFile = function (index) { 
            vm.CheckImages.splice(index, 1);
            vm.Hotel.imagesURL.splice(index, 1);
        }}	
}());
