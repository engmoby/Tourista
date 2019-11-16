(function () {
    'use strict';

    angular
        .module('home')
        .controller('InqueryController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'ContactFormResource', 'InqueryPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', InqueryController])


    // .directive('modal', function () {
    //     return {
    //         template: '<div class="modal fade">' +
    //             '<div class="modal-dialog">' +
    //               '<div class="modal-content">' +
    //                 '<div class="modal-header">' +
    //                   '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
    //                   '<h4 class="modal-title">{{ title }}</h4>' +
    //                 '</div>' +
    //                 '<div class="modal-body" ng-transclude></div>' +
    //               '</div>' +
    //             '</div>' +
    //           '</div>',
    //         restrict: 'E',
    //         transclude: true,
    //         replace: true,
    //         scope: true,
    //         link: function postLink(scope, element, attrs) {
    //             scope.title = attrs.title;

    //             scope.$watch(attrs.visible, function (value) {
    //                 if (value == true)
    //                     $(element).modal('show');
    //                 else
    //                     $(element).modal('hide');
    //             });

    //             $(element).on('shown.bs.modal', function () {
    //                 scope.$apply(function () {
    //                     scope.$parent[attrs.visible] = true;
    //                 });
    //             });

    //             $(element).on('hidden.bs.modal', function () {
    //                 scope.$apply(function () {
    //                     scope.$parent[attrs.visible] = false;
    //                 });
    //             });
    //         }
    //     };
    // });
    function InqueryController($rootScope, blockUI, $scope, $filter, $translate,
        $state, ContactFormResource, InqueryPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {
        $scope.FrontServer = appCONSTANTS.FrontServer_URL;
        $scope.showModal = false;
        $scope.toggleModal = function (obj) {
            $scope.showModal = !$scope.showModal;
            $scope.showmessage = obj.message;
        };


        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[18].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = InqueryPrepService.totalCount;
        $scope.InqueryList = InqueryPrepService;
        console.log($scope.InqueryList);
        function refreshInquerys() {

            blockUI.start("Loading...");

            var k = ContactFormResource.getAllInquerys({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.InqueryList = results
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
            refreshInquerys();
        }
        blockUI.stop();

    }


})();
