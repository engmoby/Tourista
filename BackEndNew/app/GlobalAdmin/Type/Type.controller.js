(function () {
    'use strict';

    angular
        .module('home')
        .controller('TypeController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'TypeResource', 'TypePrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', TypeController]);


    function TypeController($rootScope, blockUI, $scope, $filter, $translate,
        $state, TypeResource, TypePrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[12].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.totalCount = TypePrepService.totalCount;
        $scope.TypeList = TypePrepService;
        function refreshTypes() {

            blockUI.start("Loading..."); 
            
            var k = TypeResource.getAllCurrencies({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.TypeList = results  
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
            refreshTypes();
        }
        blockUI.stop();
        
    }

})();
