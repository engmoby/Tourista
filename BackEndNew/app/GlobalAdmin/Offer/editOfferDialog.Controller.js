(function () {
    'use strict';

    angular
        .module('home')
        .controller('editOfferDialogController', ['$scope', '$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'AllCountryPrepService', 'CurrencyPrepService', 'OfferResource', 'ToastService', 'HotelPrepService', 'TypePrepService', 'OfferByIdPrepService', editOfferDialogController])

    function editOfferDialogController($scope, $filter, blockUI, $http, $state, appCONSTANTS, $translate, AllCountryPrepService,
        CurrencyPrepService, OfferResource, ToastService, HotelPrepService, TypePrepService, OfferByIdPrepService) {
        blockUI.start("Loading...");
        function init() {
            $scope.CountryList = [];
            $scope.CountryList = $scope.CountryList.concat(AllCountryPrepService.results)
            $scope.HotelList = HotelPrepService.results;
            $scope.TypeList = TypePrepService.results;
            $scope.CurrencyList = CurrencyPrepService.results;

            $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
        }
        init();

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Offer = OfferByIdPrepService;
        vm.RemoveImages = [];
        vm.CheckImages = [];
        vm.selectedHotel = [];
        console.log(vm.Offer);
        vm.CheckImages.push(vm.Offer.imagesURL);
        // var i;
        // for (i = 0; i < vm.Offer.offerHotel.length; i++) {
        //     var indexHotel = $scope.HotelList.indexOf($filter('filter')($scope.HotelList, { 'HotelId': vm.Offer.offerHotel[i].HotelId }, true)[0]);
        //     vm.selectedHotel.push($scope.HotelList[indexHotel]);

        // }
        vm.Offer.dateFrom = vm.Offer.dateFrom + "Z";
        vm.Offer.dateFrom = $filter('date')(new Date(vm.Offer.dateFrom), "MM/dd/yyyy hh:mm a");
        vm.Offer.dateTo = vm.Offer.dateTo + "Z";
        vm.Offer.dateTo = $filter('date')(new Date(vm.Offer.dateTo), "MM/dd/yyyy hh:mm a");


        var indexCurrency = $scope.CurrencyList.indexOf($filter('filter')($scope.CurrencyList, { 'currencyId': vm.Offer.currency.currencyId }, true)[0]);
        $scope.selectedCurrency = $scope.CurrencyList[indexCurrency];


        var indexHotel = $scope.HotelList.indexOf($filter('filter')($scope.HotelList, { 'hotelId': vm.Offer.hotel.hotelId }, true)[0]);
        $scope.selectedHotel = $scope.HotelList[indexHotel];

        var indexType = $scope.TypeList.indexOf($filter('filter')($scope.TypeList, { 'typeId': vm.Offer.type.typeId }, true)[0]);
        $scope.selectedType = $scope.TypeList[indexType];

        var indexCountry = $scope.CountryList.indexOf($filter('filter')($scope.CountryList, { 'countryId': vm.Offer.city.countryId }, true)[0]);
        $scope.selectedCountry = $scope.CountryList[indexCountry];


        $scope.CityList = $scope.selectedCountry.cityes;
        var indexCity = $scope.selectedCountry.cityes.indexOf($filter('filter')($scope.selectedCountry.cityes, { 'cityId': vm.Offer.city.cityId }, true)[0]);
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
            if ($('#dateFrom').data('date') == null || $('#dateFrom').data('date') == "" ||
                $('#dateTo').data('date') == null || $('#dateTo').data('date') == "") {
                $scope.dateIsValid = false;
                // $scope.$apply();
            } else if ($scope.UpdateTourForm.$valid) {
                $scope.dateIsValid = true;
                // $scope.$apply();
            }
        }
        vm.UpdateOffer = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var updateObj = new Object();
            updateObj.offerId = vm.Offer.offerId;
            updateObj.titleDictionary = vm.Offer.titleDictionary;
            updateObj.descriptionDictionary = vm.Offer.descriptionDictionary;
            updateObj.star = $scope.selectedHotel.star;
            updateObj.cityId = $scope.selectedCity.cityId;
            updateObj.removeImages = vm.RemoveImages;
            updateObj.daysCount = vm.Offer.daysCount;
            updateObj.nigthsCount = vm.Offer.nigthsCount;
            updateObj.priceBefore = vm.Offer.priceBefore;
            updateObj.price = vm.Offer.price;
            updateObj.hotelId = $scope.selectedHotel.hotelId;
            updateObj.typeId = $scope.selectedType.typeId;
            updateObj.currencyId = $scope.selectedCurrency.currencyId;

            updateObj.dateFrom = $('#dateFrom').val();// vm.dateFrom;
            updateObj.dateTo = $('#dateTo').val();//vm.dateTo;

            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Offers/EditOffer',
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
                        $scope.UpdateOfferForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            vm.CheckImages.push(imageFile);
                            vm.showButton = false;
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

            vm.showButton = true;
            $apply();
        }

        vm.removeOfferFile = function (index) {
            vm.CheckImages.splice(index, 1);
            vm.Offer.imagesURL.splice(index, 1);

            vm.showButton = true;
            $apply();
        }
    }
}());
