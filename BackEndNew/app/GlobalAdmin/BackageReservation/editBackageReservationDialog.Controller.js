
(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editBackageReservationDialogController', ['$scope','$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'BackageReservationResource', 'ToastService',
            'BackageReservationByIdPrepService', editBackageReservationDialogController])

    function editBackageReservationDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, BackageReservationResource, ToastService, BackageReservationByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
        $scope.StatusList = appCONSTANTS.Status;
		vm.language = appCONSTANTS.supportedLanguage;
        vm.BackageReservation = BackageReservationByIdPrepService; 
        console.log( vm.BackageReservation);
       
        var indexStatus = $scope.StatusList.indexOf($filter('filter')($scope.StatusList, { 'id': vm.BackageReservation.status }, true)[0]);
        $scope.selectedStatus=$scope.StatusList[indexStatus];


        vm.Close = function () {
            $state.go('BackageReservation');
        }
        vm.UpdateBackageReservation = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new BackageReservationResource();
            updateObj.backageReservationId = vm.BackageReservation.backageReservationId; 
            updateObj.adult = vm.BackageReservation.adult; 
            updateObj.roomCount = vm.BackageReservation.roomCount; 
            updateObj.child = vm.BackageReservation.child; 
            updateObj.status = $scope.selectedStatus.id; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('BackageReservation');

                },
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();
        
	}	
}());
