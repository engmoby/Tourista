(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('createNewsDialogController', ['$scope','$filter',  'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'NewsResource', 'ToastService', '$rootScope', createNewsDialogController])

    function createNewsDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, NewsResource,
        ToastService, $rootScope) {
        
        blockUI.start("Loading..."); 
            
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('News');
		} 
		 
		// vm.AddNewNews = function () {
        //     blockUI.start("Loading..."); 
            
        //     var newObj = new NewsResource();
        //     newObj.titleDictionary = vm.titleDictionary; 
        //     newObj.descriptionDictionary = vm.descriptionDictionary; 
        //     newObj.IsDeleted = false;  
        //     newObj.$create().then(
        //         function (data, status) { 
        // ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
        //             $state.go('News');
        //              blockUI.stop();        


        //         },
        //         function (data, status) {
        //        blockUI.stop();        

        //             ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        //         }
        //     );
        // }
        blockUI.stop();
     
     
     
        vm.AddNewNews = function(){
			vm.isChanged = true;
            var newNews = new Object();  
            newNews.titleDictionary = vm.titleDictionary; 
            newNews.descriptionDictionary = vm.descriptionDictionary; 
        
            
            var model = new FormData();
            model.append('data', JSON.stringify(newNews));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
				method: 'POST',
				url: appCONSTANTS.API_URL + 'News/',
				useToken: true,
				headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('NewsAddSuccess'),"success"); 
					 $state.go('News');
					 vm.isChanged = false;
				},
				function(data, status) {
					vm.isChanged = false;
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				}
            ); 
        }
        
        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        
        vm.files = [];
        $scope.AddFile = function (element) {
          debugger;  var imageFile = element[0];

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
                        $scope.newNewsForm.$dirty = true;
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
