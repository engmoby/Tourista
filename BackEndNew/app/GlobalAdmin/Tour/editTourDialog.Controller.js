(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editTourDialogController', ['$scope', '$filter','blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
        'CountryPrepService',    'TourResource', 'ToastService', 'FeaturePrepService', 'TourByIdPrepService', editTourDialogController])

    function editTourDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate,CountryPrepService,
         TourResource, ToastService,FeaturePrepService, TourByIdPrepService) {
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
           vm.Tour.latitude = location.lat();
           vm.Tour.longitude = location.lng();
            $scope.$apply();
        });

        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Tour = TourByIdPrepService; 
        vm.RemoveImages = []; 
        vm.CheckImages = []; 
        vm.selectedTourFeatures=[] ;
        console.log( vm.Tour);
        vm.CheckImages.push(vm.Tour.imagesURL);
        var i;
        for (i = 0; i < vm.Tour.tourFeature.length; i++) {
            var indexFeature = $scope.FeatureList.indexOf($filter('filter')($scope.FeatureList, { 'featureId': vm.Tour.tourFeature[i].featureId }, true)[0]);
            vm.selectedTourFeatures.push($scope.FeatureList[indexFeature]);

        }


      var indexCountry = $scope.CountryList.indexOf($filter('filter')($scope.CountryList, { 'countryId': vm.Tour.city.countryId }, true)[0]);
      $scope.selectedCountry=$scope.CountryList[indexCountry];

      
      $scope.CityList = $scope.selectedCountry.cityes;
  var indexCity = $scope.selectedCountry.cityes.indexOf($filter('filter')($scope.selectedCountry.cityes, { 'cityId': vm.Tour.city.cityId }, true)[0]);
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
            $state.go('Tour');
        } 
        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.UpdateTour = function () {
            debugger;
        blockUI.start("Loading..."); 
        vm.isChanged = true;
            var updateObj = new Object();
            updateObj.tourId = vm.Tour.tourId; 
            updateObj.titleDictionary = vm.Tour.titleDictionary; 
            updateObj.descriptionDictionary = vm.Tour.descriptionDictionary; 
            updateObj.star = vm.Tour.star; 
            updateObj.cityId =  $scope.selectedCity.cityId; 
            updateObj.latitude =  vm.Tour.latitude; 
            updateObj.longitude =  vm.Tour.longitude; 
            updateObj.removeImages =  vm.RemoveImages; 
            updateObj.tourFeature = vm.selectedTourFeatures;
        
            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Tours/EditTour',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                   
                    blockUI.stop();
                     $state.go('Tour')

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
                        $scope.UpdateTourForm.$dirty = true;
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
	
        vm.removeTourFile = function (index) { 
            vm.CheckImages.splice(index, 1);
            vm.Tour.imagesURL.splice(index, 1);
        }}	
}());
