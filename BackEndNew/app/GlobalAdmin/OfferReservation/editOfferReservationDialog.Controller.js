
(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editOfferReservationDialogController', ['$scope','$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'OfferReservationResource', 'ToastService',
            'OfferReservationByIdPrepService', editOfferReservationDialogController])

    function editOfferReservationDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, OfferReservationResource, ToastService, OfferReservationByIdPrepService) {
        blockUI.start("Loading..."); 
        
        var vm = this; 
        $scope.StatusList = appCONSTANTS.Status;
		vm.language = appCONSTANTS.supportedLanguage;
        vm.OfferReservation = OfferReservationByIdPrepService; 
        console.log( vm.OfferReservation);
       
        var indexStatus = $scope.StatusList.indexOf($filter('filter')($scope.StatusList, { 'id': vm.OfferReservation.status }, true)[0]);
        $scope.selectedStatus=$scope.StatusList[indexStatus];


        vm.Close = function () {
            $state.go('OfferReservation');
        }
        vm.UpdateOfferReservation = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new OfferReservationResource();
            updateObj.offerReservationId = vm.OfferReservation.offerReservationId; 
            updateObj.adult = vm.OfferReservation.adult; 
            updateObj.roomCount = vm.OfferReservation.roomCount; 
            updateObj.child = vm.OfferReservation.child; 
            updateObj.status = $scope.selectedStatus.id; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
 
                    $state.go('OfferReservation');

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
