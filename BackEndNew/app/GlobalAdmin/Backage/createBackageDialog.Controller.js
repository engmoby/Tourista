(function () {
    'use strict';

    angular
        .module('home')
        .controller('createBackageDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService', 'HotelPrepService', 'TypePrepService', 'BackageResource', 'ToastService', '$rootScope', createBackageDialogController])

    function createBackageDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        HotelPrepService, TypePrepService, BackageResource, ToastService, $rootScope) {

        blockUI.start("Loading...");
        function init() {
            $scope.selectedCountry = { CountryId: 0, titleDictionary: { "en": "Select Country", "ar": "اختار منطقه" } };
            $scope.CountryList = [];
            $scope.CountryList.push($scope.selectedCountry);
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results)

            $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
            $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
            debugger;
            $scope.HotelList = HotelPrepService.results;
            $scope.TypeList = TypePrepService.results;
        }
        init();

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

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Backage');
        }



        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.AddNewBackage = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var newBackage = new Object();
            newBackage.titleDictionary = vm.titleDictionary;
            newBackage.descriptionDictionary = vm.descriptionDictionary;
            newBackage.star = vm.star;
            newBackage.cityId = $scope.selectedCity.cityId;
            newBackage.daysCount = vm.daysCount;
            newBackage.nigthsCount = vm.nigthsCount;
            newBackage.price = vm.price;
            newBackage.hotelId = vm.selectedHotel.hotelId;
            newBackage.typeId = vm.selectedType.typeId;

            var model = new FormData();
            model.append('data', JSON.stringify(newBackage));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Backages/',
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
            debugger; var imageFile = element[0];

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
                        $scope.newBackageForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
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
            vm.files.splice(index, 1);
        }

    }
}());
