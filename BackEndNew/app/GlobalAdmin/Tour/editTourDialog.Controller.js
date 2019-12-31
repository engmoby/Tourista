(function () {
    'use strict';

    angular
        .module('home')
        .controller('editTourDialogController', ['$scope', '$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'AllCountryPrepService','CurrencyPrepService', 'TourResource', 'ToastService', 'TourByIdPrepService', editTourDialogController])

    function editTourDialogController($scope, $filter, blockUI, $http, $state, appCONSTANTS, $translate, AllCountryPrepService,
        CurrencyPrepService,   TourResource, ToastService, TourByIdPrepService) {
        blockUI.start("Loading...");


        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Tour = TourByIdPrepService;
        vm.RemoveImages = [];
        vm.CheckImages = [];
        $scope.CurrencyList = CurrencyPrepService.results;
        var indexCurrency = $scope.CurrencyList.indexOf($filter('filter')($scope.CurrencyList, { 'currencyId': vm.Tour.currency.currencyId }, true)[0]);
        $scope.selectedCurrency = $scope.CurrencyList[indexCurrency];

        vm.Tour.startFrom = vm.Tour.startFrom + "Z";
        vm.Tour.startFrom = $filter('date')(new Date(vm.Tour.startFrom), "MM/dd/yyyy hh:mm a"); 
        vm.Tour.startTo = vm.Tour.startTo + "Z";
        vm.Tour.startTo = $filter('date')(new Date(vm.Tour.startTo), "MM/dd/yyyy hh:mm a");
       
        console.log(vm.Tour);
       // vm.CheckImages.push(vm.Tour.imagesURL);

        vm.Close = function () {
            $state.go('Tour');
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
            } else if ($scope.UpdateTourForm.$valid) {
                $scope.dateIsValid = true;
                // $scope.$apply();
            }
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
            updateObj.mekkaDays = vm.Tour.mekkaDays; 
            updateObj.madinaDays = vm.Tour.madinaDays; 
            updateObj.duration = vm.Tour.duration; 
            updateObj.price = vm.Tour.price; 
            updateObj.startFrom =$('#startFrom').val();// vm.startFrom;
            updateObj.startTo = $('#startTo').val();//vm.startTo;
            updateObj.hotelTitle = vm.Tour.hotelTitle;
            updateObj.currencyId = $scope.selectedCurrency.currencyId;


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

        vm.removeTourFile = function (index) {
            vm.CheckImages.splice(index, 1);
            vm.Tour.imagesURL.splice(index, 1);
       
            vm.showButton = true;
            $apply();
         }
    }
}());
