(function () {
    'use strict';

    angular
        .module('home')
        .controller('FeatureController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'FeatureResource', 'FeaturePrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', FeatureController]);


    function FeatureController($rootScope, blockUI, $scope, $filter, $translate,
        $state, FeatureResource, FeaturePrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[13].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.totalCount = FeaturePrepService.totalCount;
        $scope.FeatureList = FeaturePrepService;
        console.log( $scope.FeatureList );
        function refreshFeatures() {

            blockUI.start("Loading..."); 
            
            var k = FeatureResource.getAllFeatures({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.FeatureList = results  
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
            refreshFeatures();
        }
        blockUI.stop();
        
    }

})();
