
(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editTourReservationDialogController', ['$scope','$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'TourReservationResource', 'ToastService',
            'TourReservationByIdPrepService', editTourReservationDialogController])

    function editTourReservationDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, TourReservationResource, ToastService, TourReservationByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
        $scope.StatusList = appCONSTANTS.Status;
		vm.language = appCONSTANTS.supportedLanguage;
        vm.TourReservation = TourReservationByIdPrepService; 
        console.log( vm.TourReservation);
       
        var indexStatus = $scope.StatusList.indexOf($filter('filter')($scope.StatusList, { 'id': vm.TourReservation.status }, true)[0]);
        $scope.selectedStatus=$scope.StatusList[indexStatus];


        vm.Close = function () {
            $state.go('TourReservation');
        }
        vm.UpdateTourReservation = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new TourReservationResource();
            updateObj.tourReservationId = vm.TourReservation.tourReservationId; 
            updateObj.adult = vm.TourReservation.adult; 
            updateObj.roomCount = vm.TourReservation.roomCount; 
            updateObj.child = vm.TourReservation.child; 
            updateObj.status = $scope.selectedStatus.id; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('TourReservation');

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
