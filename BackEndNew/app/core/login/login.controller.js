(function () {
    'use strict';

    angular
        .module('home')
        .controller('loginController', ['$rootScope', '$scope', '$state', '$localStorage', 'authorizationService', 'appCONSTANTS', loginController]);

    function loginController($rootScope, $scope, $state, $localStorage, authorizationService, appCONSTANTS) {

        if ($localStorage.authInfo) {
            var user = authorizationService.getUser();
            if (user.PermissionId[0] == 1)
                $state.go('users');
            // if (user.PermissionId[0] == 2)
            //     $state.go('usertype');
            if (user.PermissionId[0] == 3)
                $state.go('Role');
            if (user.PermissionId[0] == 4)
                $state.go('Area');
            if (user.PermissionId[0] == 5)
                $state.go('Department');
            if (user.PermissionId[0] == 6)
                $state.go('Question');
            if (user.PermissionId[0] == 7)
                $state.go('AnswerQuestion');
            if (user.PermissionId[0] == 8)
                $state.go('Answers');
            if ($scope.user.PermissionId[0] == 9)
                $state.go('Tickets');
            if ($scope.user.PermissionId[0] == 10)
                $state.go('Dashboard');

        }
        else {
            $state.go('login');
        }
    }

}())