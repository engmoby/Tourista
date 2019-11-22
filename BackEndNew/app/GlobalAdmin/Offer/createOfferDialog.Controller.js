(function () {
    'use strict';

    angular
        .module('home')
        .controller('createOfferDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
          'CurrencyPrepService',  'CountryPrepService', 'HotelPrepService', 'TypePrepService', 'OfferResource', 'ToastService', '$rootScope', createOfferDialogController])

    function createOfferDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate,
        CurrencyPrepService, CountryPrepService,
        HotelPrepService, TypePrepService, OfferResource, ToastService, $rootScope) {

        blockUI.start("Loading...");
        function init() {
            $scope.selectedCountry = { CountryId: 0, titleDictionary: { "en": "Select Country", "ar": "اختار منطقه" } };
            $scope.CountryList = [];
            $scope.CountryList.push($scope.selectedCountry);
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results)
            $scope.CurrencyList = CurrencyPrepService.results;

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
            $state.go('Offer');
        }



        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#startFrom').data('date') == null || $('#startFrom').data('date') == "" ||
            $('#startTo').data('date') == null || $('#startTo').data('date') == "") {
                $scope.dateIsValid = false;
                // $scope.$apply();
            } else if ($scope.newOfferForm.$valid) {
                $scope.dateIsValid = true;
                // $scope.$apply();
            }
        }
        vm.AddNewOffer = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var newOffer = new Object();
            newOffer.titleDictionary = vm.titleDictionary;
            newOffer.descriptionDictionary = vm.descriptionDictionary;
             newOffer.star =vm.selectedHotel.star;
            newOffer.cityId = $scope.selectedCity.cityId;
            newOffer.daysCount = vm.daysCount;
            newOffer.nigthsCount = vm.nigthsCount;
            newOffer.priceBefore = vm.priceBefore;
            newOffer.price = vm.price;
            newOffer.hotelId = vm.selectedHotel.hotelId;
            newOffer.typeId = vm.selectedType.typeId;
            newOffer.currencyId = vm.selectedCurrency.currencyId;
            newOffer.dateFrom =$('#startFrom').val();// vm.startFrom;
            newOffer.dateTo = $('#startTo').val();//vm.startTo;
           
            var model = new FormData();
            model.append('data', JSON.stringify(newOffer));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Offers/',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('Offer')

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
                        $scope.newOfferForm.$dirty = true;
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
