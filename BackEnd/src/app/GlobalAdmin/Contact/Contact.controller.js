(function () {
    'use strict';

    angular
        .module('home')
        .controller('ContactController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'ContactResource', 'ContactPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', ContactController]);


    function ContactController($rootScope, blockUI, $scope, $filter, $translate,
        $state, ContactResource, ContactPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.totalCount = ContactPrepService.totalCount;
        $scope.ContactList = ContactPrepService; 
      console.log( $scope.ContactList);
        function refreshContacts() {

            blockUI.start("Loading..."); 
            
            var k = ContactResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.ContactList = results  
                blockUI.stop();
                
            },
            function (data, status) {
                blockUI.stop();
                
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }
        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshContacts();
        }
        blockUI.stop();
        
    }

})();
