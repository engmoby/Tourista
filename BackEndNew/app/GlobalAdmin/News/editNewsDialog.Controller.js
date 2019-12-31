(function () {
    'use strict';

    angular
        .module('home')
        .controller('editNewsDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'NewsResource', 'ToastService',
            'NewsByIdPrepService', editNewsDialogController])

    function editNewsDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, NewsResource, ToastService, NewsByIdPrepService) {
        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.News = NewsByIdPrepService;
        vm.RemoveImages = [];
        vm.CheckImages = [];
        console.log(vm.News);
        vm.Close = function () {
            $state.go('News');
        }



        vm.UpdateNews = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var updateObj = new Object();
            updateObj.newsId = vm.News.newsId;
            updateObj.titleDictionary = vm.News.titleDictionary;
            updateObj.descriptionDictionary = vm.News.descriptionDictionary;

            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'News/EditNews',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('News')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    blockUI.stop();
                }
            );
        }
        blockUI.stop();


        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

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
                        $scope.UpdateNewsForm.$dirty = true;
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
            vm.showButton = true;
            vm.RemoveImages.push(index);
            // vm.files.splice(index, 1);
            // vm.CheckImages.splice(index, 1);
        }

        vm.removeNewsFile = function (index) {
            //  vm.CheckImages.splice(index, 1);
            vm.showButton = true;
            vm.News.image = '';
        }
    }

}());
