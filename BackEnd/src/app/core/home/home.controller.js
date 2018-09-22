(function () {
    'use strict';

    angular
        .module('home')
        .controller('homeCtrl', ['$rootScope', '$transitions', '$translate', '$scope', 'appCONSTANTS', '$state', '_', 'authenticationService', 'authorizationService', '$localStorage', homeCtrl])

    function homeCtrl($rootScope, $transitions, $translate, $scope, appCONSTANTS, $state, _, authenticationService, authorizationService, $localStorage) {
        $scope.$on('LOAD', function () { $scope.loading = true });
        $scope.$on('UNLOAD', function () { $scope.loading = false });
        var vm = this;
        $scope.emailEmpty = false;
        $scope.passwordEmpty = false;
        $scope.languages = [{
            id: "en",
            label: "english"
        },
        {
            id: "ar",
            label: "arabic"
        }];
        if ($localStorage.language == null) {
            $scope.selectedLanguage = $scope.languages[0].id;
            $localStorage.language = $scope.selectedLanguage;
        }
        else
            $scope.selectedLanguage = $localStorage.language;

        $translate.use($scope.selectedLanguage);
        $scope.init =
            function () {
                $scope.user = authorizationService.getUser();

            }
        $scope.init();

        $scope.submit = function (username, password) {

            authorizationService.isPasswordchanged = false;
            $('#passwordChanged').hide();
            //  $('#userInActivated').hide();
            if (!username)
                $scope.emailEmpty = true;
            if (!password)
                $scope.passwordEmpty = true;;
            if (username && password) {
                $scope.afterSubmit = false;
                $scope.emailEmpty = $scope.passwordEmpty = false;
                authenticationService.authenticate(username, password).then(loginSuccess, loginFailed)
                //.error(loginFailed);;
            } else {
                $scope.afterSubmit = false;
            }
        };

        $scope.reloadPage = true;
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

            if (fromState.name != "" && $scope.reloadPage) {
                e.preventDefault();
                $scope.reloadPage = false;
                $state.go(toState.name, toParams, { reload: true });
            }
        });
        $transitions.onStart({}, function (transition) {
            if (authorizationService.isLoggedIn()) {
                var user = authorizationService.getUser();
                var authorize = false;
                if (transition._targetState._identifier.self != undefined) {
                    if (transition._targetState._identifier.self.data.permissions.only != undefined) {
                        transition._targetState._identifier.self.data.permissions.only.forEach(function (element) {
                            if (user.PermissionId.includes(element.toString()))
                                authorize = true;
                        }, this);
                        if (!authorize)
                            $state.go(transition._targetState._identifier.self.data.permissions.redirectTo)
                    }
                }
                // if (user.PermissionId[0] == 1)
                //     $state.go('users');
                // if (user.PermissionId[0] == 2)
                //     $state.go('usertype');
                // if (user.PermissionId[0] == 3)
                //     $state.go('Role');
                // if (user.PermissionId[0] == 4)
                //     $state.go('Area');
                // if (user.PermissionId[0] == 5)
                //     $state.go('Department');
                // if (user.PermissionId[0] == 6)
                //     $state.go('Question');
                // if (user.PermissionId[0] == 7)
                //     $state.go('AnswerQuestion');
                // if (user.PermissionId[0] == 8)
                //     $state.go('Answers');
                // if (user.PermissionId[0] == 9)
                //     $state.go('Tickets');
            }
            else {
                $state.go('login');
            }
        });
        $scope.$watch(function () { return $localStorage.authInfo; }, function (newVal, oldVal) {
            if (oldVal != undefined && newVal === undefined && $localStorage.authInfo == undefined) {
                console.log('logout');
                $state.go('login');
            }
            if (oldVal === undefined && newVal !== undefined && $localStorage.authInfo != undefined) {
                console.log('login');
                $scope.user = authorizationService.getUser();
                loginSuccess()
                // authorizationService.isLoggedIn() && !location.href.contains('connect')
            }
        })
        function loginSuccess(response) {
            $scope.afterSubmit = false;
            $scope.invalidLoginInfo = false;
            $scope.inActiveUser = false;
            $scope.user = authorizationService.getUser();
            if ($scope.user.PermissionId[0] == 1)
                $state.go('users');
            // if ($scope.user.PermissionId[0] == 2)
            //     $state.go('usertype');
            if ($scope.user.PermissionId[0] == 3)
                $state.go('Role');
            if ($scope.user.PermissionId[0] == 4)
                $state.go('Area');
            if ($scope.user.PermissionId[0] == 5)
                $state.go('Department');
            if ($scope.user.PermissionId[0] == 6)
                $state.go('Question');
            if ($scope.user.PermissionId[0] == 7)
                $state.go('AnswerQuestion');
            if ($scope.user.PermissionId[0] == 8)
                $state.go('Answers');
            if ($scope.user.PermissionId[0] == 9)
                $state.go('Tickets');
            if ($scope.user.PermissionId[0] == 10)
                $state.go('Dashboard');


        }

        function loginFailed(response) {
            $scope.afterSubmit = true;

            // $scope.invalidLoginInfo = true;
            if (response) {
                if (response.data.error == "invalid grant") {
                    $scope.invalidLoginInfo = true;
                    $scope.inActiveUser = false;
                }
                if (response.data.error == "inactive user") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = true;
                }
            }
            if (response == null) {
                $scope.invalidLoginInfo = false;
                $scope.inActiveUser = true;
            }
        }

        $scope.logout = function () {
            authorizationService.logout();
            $state.go('login');
        }
        $scope.reset = function () {
            $scope.invalidLoginInfo = false;
            $scope.inActiveUser = false;
        }
        $scope.isLoggedIn = function () {
            return authorizationService.isLoggedIn();
        }
        $scope.changeLanguage = function (language) {
            $scope.selectedLanguage = language;
            $localStorage.language = $scope.selectedLanguage;
            $state.reload();
            $translate.use(language);
        }
        $scope.getCurrentTime = function () {
            return (new Date()).getTime()
        }


    }


}());
