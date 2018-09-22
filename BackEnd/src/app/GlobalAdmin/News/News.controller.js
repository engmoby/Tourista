(function () {
    'use strict';

    angular
        .module('home')
        .controller('NewsController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'NewsResource', 'NewsPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', NewsController]);


    function NewsController($rootScope, blockUI, $scope, $filter, $translate,
        $state, NewsResource, NewsPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

        blockUI.start("Loading..."); 
            
        var vm = this;
        $scope.totalCount = NewsPrepService.totalCount;
        $scope.NewsList = NewsPrepService;
        function refreshNews() {

            blockUI.start("Loading..."); 
            
            var k = NewsResource.getAllNews({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.NewsList = results  
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
            refreshNewss();
        }
        blockUI.stop();
        
    }

})();
