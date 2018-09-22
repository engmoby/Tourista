(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editFeatureDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'FeatureResource', 'ToastService',
            'FeatureByIdPrepService', editFeatureDialogController])

    function editFeatureDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, FeatureResource, ToastService, FeatureByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Feature = FeatureByIdPrepService; 
        vm.RemoveImages = []; 
        vm.CheckImages = []; 
         vm.CheckImages.push(vm.Feature.icon);
        vm.Close = function () {
            $state.go('Feature');
        }
        vm.UpdateFeature = function () { 
            blockUI.start("Loading..."); 
            
            var updateObj = new FeatureResource();
            updateObj.featureId = vm.Feature.featureId;
            updateObj.titleDictionary = vm.Feature.titleDictionary;
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('Feature');

                },
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.isChanged = false;
        blockUI.stop();

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.UpdateFeature = function () {
            debugger;
        blockUI.start("Loading..."); 
        vm.isChanged = true;
            var updateObj = new Object();
            updateObj.featureId = vm.Feature.featureId;
            updateObj.titleDictionary = vm.Feature.titleDictionary;
		    updateObj.IsDeleted = false; 
        
            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Features/EditFeature',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                   
                    blockUI.stop();
                     $state.go('Feature')

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
                        $scope.UpdateFeatureForm.$dirty = true;
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
	
        vm.removeFeatureFile = function (index) { 
            vm.CheckImages.splice(index, 1);
            vm.Feature.imagesURL.splice(index, 1);
        }}
        
 	
}());
