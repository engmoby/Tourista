
(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editHotelReservationDialogController', ['$scope','$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'HotelReservationResource', 'ToastService',
            'HotelReservationByIdPrepService', editHotelReservationDialogController])

    function editHotelReservationDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, HotelReservationResource, ToastService, HotelReservationByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
        $scope.StatusList = appCONSTANTS.Status;
		vm.language = appCONSTANTS.supportedLanguage;
        vm.HotelReservation = HotelReservationByIdPrepService; 
        console.log( vm.HotelReservation);
       
        var indexStatus = $scope.StatusList.indexOf($filter('filter')($scope.StatusList, { 'id': vm.HotelReservation.status }, true)[0]);
        $scope.selectedStatus=$scope.StatusList[indexStatus];


        vm.Close = function () {
            $state.go('HotelReservation');
        }
        vm.UpdateHotelReservation = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new HotelReservationResource();
            updateObj.hotelReservationId = vm.HotelReservation.hotelReservationId; 
            updateObj.adult = vm.HotelReservation.adult; 
            updateObj.roomCount = vm.HotelReservation.roomCount; 
            updateObj.child = vm.HotelReservation.child; 
            updateObj.status = $scope.selectedStatus.id; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('HotelReservation');

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
