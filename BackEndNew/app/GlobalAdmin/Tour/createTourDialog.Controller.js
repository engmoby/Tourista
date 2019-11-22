(function () {
    'use strict';

    angular
        .module('home')
        .controller('createTourDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService','CurrencyPrepService', 'FeaturePrepService', 'TourResource', 'ToastService', '$rootScope', createTourDialogController])

    function createTourDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        CurrencyPrepService, FeaturePrepService, TourResource, ToastService, $rootScope) {

        blockUI.start("Loading..."); 
        $scope.CurrencyList = CurrencyPrepService.results;
     
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Tour');
        }
 

        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.AddNewTour = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var newTour = new Object();
            newTour.titleDictionary = vm.titleDictionary;
            newTour.descriptionDictionary = vm.descriptionDictionary; 
            newTour.mekkaDays = vm.mekkaDays; 
            newTour.madinaDays = vm.madinaDays; 
            newTour.duration = vm.duration; 
            newTour.price = vm.price; 
            newTour.startFrom =$('#startFrom').val();// vm.startFrom;
            newTour.startTo = $('#startTo').val();//vm.startTo;
            newTour.hotelTitle = vm.hotelTitle;
            newTour.currencyId = vm.selectedCurrency.currencyId;

            var model = new FormData();
            model.append('data', JSON.stringify(newTour));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Tours/',
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
        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#startFrom').data('date') == null || $('#startFrom').data('date') == "" ||
            $('#startTo').data('date') == null || $('#startTo').data('date') == "") {
                $scope.dateIsValid = false;
                // $scope.$apply();
            } else if ($scope.newTourForm.$valid) {
                $scope.dateIsValid = true;
                // $scope.$apply();
            }
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
                        $scope.newTourForm.$dirty = true;
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
