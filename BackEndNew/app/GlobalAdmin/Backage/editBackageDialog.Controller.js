(function () {
    'use strict';

    angular
        .module('home')
        .controller('editBackageDialogController', ['$scope', '$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService', 'BackageResource', 'ToastService', 'CurrencyPrepService','TypePrepService', 'BackageByIdPrepService', editBackageDialogController])

    function editBackageDialogController($scope, $filter, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        BackageResource, ToastService, CurrencyPrepService,TypePrepService, BackageByIdPrepService) {
        blockUI.start("Loading...");
        function init() {
            $scope.CountryList = [];
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results)
            $scope.CurrencyList = CurrencyPrepService.results;
            $scope.TypeList = TypePrepService.results;

            $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
        }
        init(); 

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Backage = BackageByIdPrepService;
        vm.RemoveImages = [];
        vm.CheckImages = [];
        vm.selectedCurrency = [];
        console.log(vm.Backage);
        vm.CheckImages.push(vm.Backage.imagesURL);
        // var i;
        // for (i = 0; i < vm.Backage.backageCurrency.length; i++) {
        //     var indexCurrency = $scope.CurrencyList.indexOf($filter('filter')($scope.CurrencyList, { 'CurrencyId': vm.Backage.backageCurrency[i].CurrencyId }, true)[0]);
        //     vm.selectedCurrency.push($scope.CurrencyList[indexCurrency]);

        // }

        var indexCurrency = $scope.CurrencyList.indexOf($filter('filter')($scope.CurrencyList, { 'currencyId': vm.Backage.currency.currencyId }, true)[0]);
        $scope.selectedCurrency = $scope.CurrencyList[indexCurrency];

        var indexType = $scope.TypeList.indexOf($filter('filter')($scope.TypeList, { 'typeId': vm.Backage.type.typeId }, true)[0]);
        $scope.selectedType = $scope.TypeList[indexType];

        var indexCountry = $scope.CountryList.indexOf($filter('filter')($scope.CountryList, { 'countryId': vm.Backage.city.countryId }, true)[0]);
        $scope.selectedCountry = $scope.CountryList[indexCountry];


        $scope.CityList = $scope.selectedCountry.cityes;
        var indexCity = $scope.selectedCountry.cityes.indexOf($filter('filter')($scope.selectedCountry.cityes, { 'cityId': vm.Backage.city.cityId }, true)[0]);
        $scope.selectedCity = $scope.selectedCountry.cityes[indexCity];

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
            $state.go('Backage');
        }
        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.UpdateBackage = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var updateObj = new Object();
            updateObj.backageId = vm.Backage.backageId;
            updateObj.titleDictionary = vm.Backage.titleDictionary;
            updateObj.descriptionDictionary = vm.Backage.descriptionDictionary;
            //updateObj.star = vm.Backage.star;
            updateObj.cityId = $scope.selectedCity.cityId; 
            updateObj.removeImages = vm.RemoveImages; 
            updateObj.daysCount = vm.Backage.daysCount;
            updateObj.nigthsCount = vm.Backage.nigthsCount;
            updateObj.price = vm.Backage.price;
             updateObj.currencyId = $scope.selectedCurrency.currencyId;
            updateObj.typeId = $scope.selectedType.typeId;


            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Backages/EditBackage',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('Backage')

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
                        $scope.UpdateBackageForm.$dirty = true;
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

        vm.removeBackageFile = function (index) {
            vm.CheckImages.splice(index, 1);
            vm.Backage.imagesURL.splice(index, 1);
        }
    }
}());
