(function() {
    'use strict';

    angular
    .module('core', [
    		'ngResource',
        'ui.router',
        //'ngMaterial',
        'ngStorage',
      'permission',
      'bw.paging',
      //'angular-progress-arc',
      'ui.event',
      'ngProgressLite',
    'ui.bootstrap',
    'pascalprecht.translate',
    // 'ADM-treeView',
    'blockUI',
    'ui.carousel',
    // 'nvd3',
    'jkAngularRatingStars','angular.filter',
    // 'gm'
    ]);
}());
;(function() {
  'use strict';

  angular
  .module('home', [
  'core'
  ]);
 
}());
;(function() {
  'use strict';

  angular
      .module('core')
      // registering 'lodash' as a constant to be able to inject it later
      .constant('_', window._)
      .run(function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      })
/*      .config(function($mdThemingProvider, $mdIconProvider) {
        // angular material design configs
        $mdIconProvider
            .defaultIconSet('./assets/svg/avatars.svg', 128);

        // use default purble color for now - uncomment to change colors
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('orange');
      })*/;

      
}());
;(function () {
	angular
		.module('core')
		.constant('appCONSTANTS', {
			 'API_URL': 'http://localhost:32569/api/', 
			//'API_URL': 'http://touristaegy.com/api/',
			'defaultLanguage': 'en',
			'supportedLanguage': {
				'en': { 'key': 'en', 'value': 'english' },
				'ar': { 'key': 'ar', 'value': 'arabic' }
			},
			'UserType': [
				{ id: 0, text: "Employee" },
				{ id: 1, text: "Manager" }
			],
			'Status': [
				{ id: 0, text: "New" },
				{ id: 1, text: "Seen" },
				{ id: 2, text: "Confirmed" },
				{ id: 3, text: "Rejected" }
			]
			, 'FrontServer_URL': 'http://localhost:32569/'
		})
		.constant('messageTypeEnum', {
			success: 0,
			warning: 1,
			error: 2
		}).constant('userRolesEnum', {
			GlobalAdmin: "GlobalAdmin"
		});
}());;(function() {
    'use strict';

    angular
        .module('core')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            // main views
            $stateProvider
              .state('root', {
                    url: '/',
               
                    controller: 'loginController',
                   
                    data: {
                       permissions: {
                          
                        }
                    },
                 
                })
                .state('login', {
                    url: '/login',
                    templateUrl: './app/core/login/templates/login.html',
                    'controller': 'loginController'
                })
                .state('403', {
                    url: '/403',
                    templateUrl: './app/shell/403.html'
                })
                .state('404', {
                    url: '/404',
                    templateUrl: './app/shell/404.html'
                })
                .state('401', {
                    url: '/401',
                    templateUrl: './app/shell/401.html'
                })
        });
    
}());
;
angular.module('core')

  .directive('equalto', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        otherModelValue: '=equalto'
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.equalto = function(modelValue) {
          return modelValue == scope.otherModelValue.$modelValue;
        };
        scope.$watch('otherModelValue.$modelValue', function() {
          ngModel.$validate();
        },true);

      }
    };
  }

)
.directive('numbersOnly', function () {
  return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
              if (text) {
                  var transformedInput = text.replace(/[^0-9]/g, '');

                  if (transformedInput !== text) {
                      ngModelCtrl.$setViewValue(transformedInput);
                      ngModelCtrl.$render();
                  }
                  return transformedInput;
              }
              return undefined;
          }            
          ngModelCtrl.$parsers.push(fromUser);
      }
  };
})
.directive('loadingPane', function ($timeout, $window) {
  return {
      restrict: 'A',
      link: function (scope, element, attr) {
          var directiveId = 'loadingPane';

          var targetElement;
          var paneElement;
          var throttledPosition;

          function init(element) {
              targetElement = element;

              paneElement = angular.element('<div>');
              paneElement.addClass('loading-pane');

              if (attr['id']) {
                  paneElement.attr('data-target-id', attr['id']);
              }

              var spinnerImage = angular.element('<div>');
              spinnerImage.addClass('spinner-image');
              spinnerImage.appendTo(paneElement);

              angular.element('body').append(paneElement);

              setZIndex();

              //reposition window after a while, just in case if:
              // - watched scope property will be set to true from the beginning
              // - and initial position of the target element will be shifted during page rendering
              $timeout(position, 100);
              $timeout(position, 200);
              $timeout(position, 300);

              throttledPosition = _.throttle(position, 50);
              angular.element($window).scroll(throttledPosition);
              angular.element($window).resize(throttledPosition);
          }

          function updateVisibility(isVisible) {
              if (isVisible) {
                  show();
              } else {
                  hide();
              }
          }

          function setZIndex() {                
              var paneZIndex = 500;

              paneElement.css('zIndex', paneZIndex).find('.spinner-image').css('zIndex', paneZIndex + 1);
          }

          function position() {
              paneElement.css({
                  'left': targetElement.offset().left,
                  'top': targetElement.offset().top - $(window).scrollTop(),
                  'width': targetElement.outerWidth(),
                  'height': targetElement.outerHeight()
              });
          }

          function show() {
              paneElement.show();
              position();
          }

          function hide() {
              paneElement.hide();
          }

          init(element);

          scope.$watch(attr[directiveId], function (newVal) {
              updateVisibility(newVal);
          });

          scope.$on('$destroy', function cleanup() {
              paneElement.remove();
              $(window).off('scroll', throttledPosition);
              $(window).off('resize', throttledPosition);
          });
      }
  };
});
;
;(function () {
  'use strict';

  angular
    .module('core').config(["$translateProvider", "appCONSTANTS", function ($translateProvider, appCONSTANTS) {

      var en_translations = {
        "FirstNameLbl": "FirstName",
        "LastNameLbl": "lastName",
        "EmailLbl": "Email",
        "Phone1Lbl": "Phone1",
        "Phone2Lbl": "Phone2",
        "FirstNameLengthError": "FirstName is required",
        "LastNameLengthError": "LastName is required",
        "EmailLengthError": "Email is required",
        "PhoneReqError": "Phone is required",
        "PhoneLengthError": "digits must be from 10 :50",
        "NameLengthError": "character must be from 3 :50",
        "NameLengthError200": "character must be from 3 :200",
        "NameLengthError255": "character must be from 3 :255",
        "NotPhoneNumber": "please enter numbers only",
        "PasswordLengthError": "Password is required",
        "UserPasswordLbl": "password",
        "ConfirmPasswordLbl": "Confirm password",
        "saveChangesBtn": "save changes",
        "DiscardBtn": "Discard",
        "ClientAddSuccess": "Client Add Success",
        "BackageAddSuccess": "Backage Add Success",
        "BackageEditSuccess": "Backage Edit Success",
        "ClientEditSuccess": "Client Edit Success",
        "LimitUserValidation": "Must be at least 1 user",
        "AddUserBtn": "Add new user",
        "BasicInfoLbl": "Basic Info",
        "NextLbl": "Next",
        "userName": "UserName",
        "StatusLbl": "Status",
        "ProductTitleLbl": "Product Title",
        "ProductDescLbl": "Product Desc",
        "ProductCountLbl": "Backage Count",
        "Edit": "Edit",
        "userlimitLbl": "Limit",
        "concumerLbl": "Consumer User",
        "startDateLbl": "Start Date",
        "enddateLbl": "End Date ",
        "AddProductBtn": "Add Product",
        "Products": "Products",
        "backage": "Duration",
        "user": "Users",
        "logoutBtn": "logout",
        "TextOnly": "Text Only",
        "passworddontmatch": "Passwords don't match",

        "WrongMail": "please enter right email format",
        "ApiUrlLbl": "Website Url",
        "Wrongapi": " Wrong Website Url",
        "requiredApi": "Website Url  is required",
        "productEditSuccess": "Update Edit Success",
        "productAddSuccess": "Update Add Success",
        "product": "Product",
        "englishName": "English Name",
        "arabicName": "Arabic Name",
        "english": "english",
        "arabic": "arabic",
        "NoBackageAvailable": "No backage available",
        "View": "View",
        "AddNew": "Add New",
        "NousertypesAvailable": "No user's types Available",
        "AddBtn": "Add",
        "Name": "Name",
        "status": "Status",
        "Static": "Static",
        "NewUserTypeLbl": "New User Type",
        "NoRolesAvailable": "No Role Available",
        "NewRoleLbl": "New Role",
        "Permission": "Permission",
        "NoAreasAvailable": "No Area Available",
        "NewArea": "New Area",
        "NoDepartmentsAvailable": "No Department Available",
        "NewDepartment": "New Department",
        "SelectGroups": "Select Groups",
        "UserType": "User Type",
        "Role": "Role",
        "Area": "Area",
        "Department": "Department",
        "users": "Users",
        "phoneLbl": "Mobile number",
        "AddNewBranch": "Add Branch",
        "AddedSuccessfully": "Added Successfully",
        "Editeduccessfully": "Edited Successfully",
        "Answers": "Answers",
        "filterBtn": "Apply filter",
        "noAnswersLbl": "There is no answers",
        "fromLbl": "from",
        "toLbl": "to",
        "Branch": "Branch",
        "AddNewCategoryBtn": "Add Category",
        "requiredErr": "Required",
        "Dynamic": "Dynamic",
        "Question": "Question",
        "AnswerQuestion": "Answers Questions",
        "Tickets": "Tickets",
        "NoTicketAvailable": "No Tickets Available",
        "titleLbl": "Title",
        "descLbl": "Description",
        "NewTicketLbl": "New Ticket",
        "AddImageBtn": "Add image",
        "Pending": "Pending",
        "Assigned": "Assigned To",
        "InProgress": "In Progress by",
        "Closed": "Closed by",
        "Rejected": "Rejected by",
        "DetailsBtn": "View details",
        "AssignedBtn": "Assigned to",
        "CategoryLbl": "Category",
        "selectTech": "Select Technacian",
        "ApproveBtn": "Approve",
        "CloseBtn": "Close",
        "RejectBtn": "Reject",
        "commentLbl": "Comment",
        "Creator": "Created by",
        "CreatTime": "Creation time",
        "AssignedBy": "Assigned by",
        "AssignedTime": "Assigned time",
        "imageLbl": "Images",
        "employee": "Employee",
        "branchManager": "Branch manager",
        "deptManager": "Department manager",
        "Tech": "Technacian",
        "DashboardLbl": "Dashboard",
        "AssignedStatus": "Assigned",
        "InProgressStatus": "In Progress",
        "ClosedStatus": "Closed",
        "RejectedStatus": "Rejected",
        "Survey": "Survey",
        "LikeLbl": "Like",
        "DisLikeLbl": "Dislike",
        "averageLbl": "Average",
        "onestar": "one star",
        "twostar": "two star",
        "threestar": "three star",
        "fourstar": "four star",
        "fivestar": "five star",
        "ticketsCount": "tickets count",
        "QuestionType": "Question Type",
        "Checkbox": "Checkbox",
        "Rate": "Rate",
        "LikeDislike": "Like or dislike",
        "value": "Answer",
        "note": "note",
        "questionEn": "Option english",
        "questionAr": "Option arabic",
        "RemoveBtn": "Remove"
      }

      var ar_translations = {
        "Editeduccessfully": "تم التعديل بنجاح",
        "AddedSuccessfully": "تمت الاضافة بنجاح",
        "AddNewBranch": "اضافة فرع",
        "phoneLbl": "رقم الجوال",
        "users": "المستخدمين",
        "Department": "قسم",
        "Area": "منطقه",
        "Role": "دور",
        "UserType": "نوع المستخدم",
        "SelectGroups": "اختر المجموعات",
        "NewDepartment": "قسم جديد",
        "NoDepartmentsAvailable": "لا يوجد قسم متاح",
        "NewArea": "منطقه جديده",
        "NoAreasAvailable": "لا يوجد مناطق متاحه",
        "Permission": "اذن",
        "NewRoleLbl": "دور جديد",
        "NoRolesAvailable": "لا يوجد دور",
        "NewUserTypeLbl": "نوع مستخدم جديد",
        "Static": "ثابته",
        "status": "الحالة",
        "Name": "الاسم",
        "AddBtn": "اضافة",
        "NousertypesAvailable": "لا يوجد أنواع للمستخدم",
        "FirstNameLbl": "الاسم الاول",
        "LastNameLbl": "الاسم الثاني",
        "EmailLbl": "البريد الالكتروني",
        "Phone1Lbl": "الرقم الاول",
        "Phone2Lbl": "الرقم الثاني",
        "FirstNameLengthError": "اسم المستخدم الاول مطلوب",
        "LastNameLengthError": "اسم المستخدم الثاني مطلوب",
        "EmailLengthError": "البريد الالكتروني مطلوب",
        "PhoneReqError": "رقم الهاتف مطلوب",
        "NameLengthError": "يجب أن تكون الحروف من 3 : 50",
        "NameLengthError200": "يجب أن تكون الحروف من 3 : 200",
        "NameLengthError255": "يجب أن تكون الحروف من 3 : 255",
        "PhoneLengthError": "يجب أن تكون الأرقام من 10: 50",
        "NotPhoneNumber": "برجاء إدخال أرقام فقط",
        "PasswordLengthError": "كلمه المرور مطلوبه",
        "UserPasswordLbl": "كلمة مرور  ",
        "ConfirmPasswordLbl": "تأكيد كلمه المرور",
        "saveChangesBtn": "حفظ",
        "DiscardBtn": "تجاهل",
        "ClientAddSuccess": "تم اضافه المستحدم بنجاح   ",
        "BackageAddSuccess": "تم اضافه الباقه بنجاح   ",
        "BackageEditSuccess": "تم تعديل الباقه بنجاح   ",
        "ClientEditSuccess": "تم تعديل بيانات المستحدم بنجاح   ",
        "LimitUserValidation": "لابد من اختيارعلي الاقل مستخدم واحد",
        "AddUserBtn": "اضافه عميل جديد",
        "BasicInfoLbl": "البيانات الاساسيه",
        "NextLbl": "التالي",
        "userName": "اسم المستخدم",
        "StatusLbl": "الحاله",
        "ProductTitleLbl": "اسم المنتج",
        "ProductDescLbl": "شرح المنتج",
        "ProductCountLbl": "عدد الباقات ",
        "Edit": "تعديل",
        "userlimitLbl": "عدد",
        "concumerLbl": "عدد المستهلكين",
        "startDateLbl": "تاريخ البدايه",
        "enddateLbl": "تاريخ الانتهاء",
        "AddProductBtn": "اضافه منتج",
        "Products": "المنتجات",
        "backage": "المده",
        "user": "المستخدمين",

        "logoutBtn": "خروج",

        "TextOnly": "حروف فقط",
        "WrongMail": "يرجى إدخال تنسيق البريد الإلكتروني الصحيح ",
        "passworddontmatch": "كلمه المرور غير متطابقه",

        "ApiUrlLbl": "رابط الموقع",
        "Wrongapi": " رابط الموقع غير صحيح",
        "requiredApi": "رابط الموقع مطلوب",
        "productEditSuccess": "تم التعديل بنجاح",
        "productAddSuccess": "تم الاضافه بنجاح",

        "product": "المنتج",
        "englishName": "الاسم انجليزي",
        "arabicName": "الاسم عربي",
        "english": "انجليزي",
        "arabic": "عربي",

        "NoBackageAvailable": "لا يوجد باقاات",
        "View": "عرض",
        "AddNew": "إضافه",
        "Answers": "الأجوبة",
        "filterBtn": "تصفيه",
        "noAnswersLbl": "لا يوجد اجوبة",
        "fromLbl": "من",
        "toLbl": "الي",
        "Branch": "فرع",
        "AddNewCategoryBtn": "اضافة الفئة",
        "requiredErr": "مطلوب",
        "Dynamic": "متحرك",
        "Question": "سؤال",
        "AnswerQuestion": "إجابات الأسئلة",
        "Tickets": "شكاوي",
        "NoTicketAvailable": "لا يوجد شكاوي",
        "titleLbl": "عنوان",
        "descLbl": "شرح",
        "NewTicketLbl": "شكوي جديد",
        "AddImageBtn": "أضف صورة",
        "Pending": "قيد الانتظار",
        "Assigned": "مخصص ل",
        "InProgress": "في تَقَدم من طرف",
        "Closed": "مغلق من طرف",
        "Rejected": "مرفوض من طرف",
        "DetailsBtn": "عرض التفاصيل",
        "AssignedBtn": "مخصص ل",
        "CategoryLbl": "فئة",
        "selectTech": "أختار فني",
        "ApproveBtn": "تأكيد",
        "CloseBtn": "غلق",
        "RejectBtn": "رفض",
        "commentLbl": "تعليق",
        "Creator": "صنع من قبل",
        "CreatTime": "وقت الإنشاء",
        "AssignedBy": "عين من",
        "AssignedTime": "الوقت التعين",
        "imageLbl": "صور",
        "employee": "موظف",
        "branchManager": "مدير فرع",
        "deptManager": "مدير أدارة",
        "Tech": "فني",
        "DashboardLbl": "لوحة القيادة",
        "AssignedStatus": "تعيين",
        "InProgressStatus": "في تَقَدم",
        "ClosedStatus": "مغلق",
        "RejectedStatus": "مرفوض",
        "Survey": "استطلاع",
        "LikeLbl": "اعجاب",
        "DisLikeLbl": "رفض",
        "averageLbl": "متوسط",
        "onestar": "نجمة واحده",
        "twostar": "نجمتين",
        "threestar": "ثلاث نجوم",
        "fourstar": "اربع نجوم",
        "fivestar": "خمس نجوم",
        "ticketsCount": "عدد الشكاوي",
        "QuestionType": "نوع السؤال",
        "Checkbox": "اختيار",
        "Rate": "تقييم",
        "LikeDislike": "اعجاب او رفض",
        "value": "أجابة",
        "note": "ملحوظه",
        "questionEn": "اختيار انجليزي",
        "questionAr": "اختيار عربي",
        "RemoveBtn": "حذف"
      }

      $translateProvider.translations('en', en_translations);

      $translateProvider.translations('ar', ar_translations);

      $translateProvider.preferredLanguage(appCONSTANTS.defaultLanguage);

    }]);

}());
;(function() {
    angular
        .module('home')
        .factory('ToastService', ToastService);

    function ToastService() {
        return {
            show: function($positionX,$positionY,$dataEffect,$dataMessage,$dataType,$actionText,$action,$duration){
			
					
				if($(window).width() < 768){
					$positionX = "center";
				}else {
					$positionX = $positionX;
				}		

				if(!$(".pmd-alert-container."+ $positionX +"."+ $positionY).length){
					$('body').append("<div class='pmd-alert-container "+$positionX+" "+$positionY+"'></div>");
				}
					
				var $currentPath = $(".pmd-alert-container."+ $positionX +"."+ $positionY);
				function notificationValue(){
					if($action == "true"){
						if($actionText == null){
							$notification =  "<div class='pmd-alert' data-action='true'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>×</a></div>";
						}else{
							$notification =  "<div class='pmd-alert' data-action='true'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>"+$actionText+"</a></div>";	
						}
						return $notification;
					}else {
						if($actionText == null){
							$notification = "<div class='pmd-alert' data-action='false'>"+$dataMessage+"</div>";
						}else{
							$notification =  "<div class='pmd-alert' data-action='false'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>"+$actionText+"</a></div>";	
						}
						return $notification;
					}
				}
				var $notification = notificationValue();
				var boxLength = $(".pmd-alert-container."+ $positionX +"."+ $positionY + " .pmd-alert").length;
				
				if($(this).attr("data-duration") !== undefined){
					$duration = $(this).attr("data-duration");
				}else {
					$duration = 3000;
				}
				
				if (boxLength > 0) {
					if ($positionY == 'top') {
						$currentPath.append($notification);
					}
					else {
						$currentPath.prepend($notification);
					}
					$currentPath.width($(".pmd-alert").outerWidth());
					if($action == "true"){
						$currentPath.children("[data-action='true']").addClass("visible" +" "+ $dataEffect);	
					}else{
						$currentPath.children("[data-action='false']").addClass("visible" +" "+ $dataEffect).delay($duration).slideUp(
							function(){
								$(this).removeClass("visible" +" "+ $dataEffect).remove();
							});	
					}
					$currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
				}else {
					$currentPath.append($notification);
					$currentPath.width($(".pmd-alert").outerWidth());
					if($action == "true"){
						$currentPath.children("[data-action='true']").addClass("visible" +" "+ $dataEffect);	
					}else{
						$currentPath.children("[data-action='false']").addClass("visible" +" "+ $dataEffect).delay($duration).slideUp(
							function(){
								$(this).removeClass("visible" +" "+ $dataEffect).remove();
							});	
					}
					$currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
				}
				var $middle = $(".pmd-alert").outerWidth() / 2;  
				$(".pmd-alert-container.center").css("marginLeft","-" + $middle+"px");
		}
		
        }

    }


}());
;(function () {
    'use strict';	
    angular
        .module('home')
        .controller('confirmDeleteDialogController', ['$uibModalInstance', 'itemName','itemId','message', 'callBackFunction',  confirmDeleteDialogController])

	function confirmDeleteDialogController($uibModalInstance, itemName,itemId,message, callBackFunction){
		var vm = this;
		vm.itemName = itemName;
		vm.message = message;
		vm.close = function(){
			$uibModalInstance.dismiss();
		}
		
		vm.Confirm = function(){
			callBackFunction(itemId);
			$uibModalInstance.dismiss();
        }
		
	}	
}());
;(function () {
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

}());(function () {
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
;(function() {
  'use strict';

  angular
    .module('core')
    .constant('AUTH_EVENTS', {
      loginFailed : 'login-failed',
      loginSuccess : 'login-success',
      logoutSuccess : 'logout-success',
      refreshedToken : 'refresh-token-success',
      invalidToken : 'invalid-token',
      failedToAuthorize: 'not-authorized',
      invalidRefreshToken: 'refresh-token-failure',
      passwordChanged: 'password-changed'

    });
}());
;(function() {
  'use strict';

  angular
    .module('core')
    .factory('authEventsHandlerService', authEventsHandlerService);

    authEventsHandlerService.$inject = ['$rootScope', 'AUTH_EVENTS', '$state'];

  function authEventsHandlerService($rootScope, AUTH_EVENTS, $state) {
    var factory = {
      initialize : initialize
    }

    return factory;

    function initialize() {
      $rootScope.$on(AUTH_EVENTS.logoutSuccess,logoutHandler);
    }

    function logoutHandler(){
      $state.go('login');
    }
  }
}());
;(function() {
  'use strict';

  angular
    .module('core')
    .factory('authenticationService', authenticationService);

  authenticationService.$inject = ['$injector', 'appCONSTANTS', 'authorizationService', 'AUTH_EVENTS', '$rootScope', '$q'];

  function authenticationService($injector, appCONSTANTS, authorizationService, AUTH_EVENTS, $rootScope, $q) {

    var factory = {
      authenticate: authenticate,
      getToken: getToken,
      isAuthenticated: isAuthenticated
    };

    return factory;

    function authenticate(email, password) {
      var credentials = {
        'username': email,
        'password': password
      }
      var request = requestToken(credentials, 'password');
      request.then(authenticated,authenticaionFailed);
      return request;
        
        //.error(authenticaionFailed);

    }


    function authenticated(data) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      return data;
    }

    function authenticaionFailed(data) {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      return data;
    }

    function getToken(forceRefresh) {
      if(!isAuthenticated()){
        return $q.reject({
          status : 401
        });
      }
      var authInfo = authorizationService.getAuthInfo();
      var expirydate = new Date(authInfo['.expires']); 
      if (forceRefresh || new Date() >= expirydate) {
        return refreshToken(authInfo['refresh_token']).then(refreshedToken,function(){
         authorizationService.logout();
        });
      }
      var defer = $q.defer();
      defer.resolve(authInfo);
      return defer.promise;
    }

    function isAuthenticated() {
      return !!authorizationService.getAuthInfo();
    }

    function refreshToken(refreshToken) {
      var credentials = {
        'refresh_token': refreshToken
      };
      return requestToken(credentials, 'refresh_token');
    }

    function refreshedToken(response){
      $rootScope.$broadcast(AUTH_EVENTS.refreshedToken);
      authorizationService.setAuthInfo(response);
      return response.data;
    }


    function requestToken(credentials, grantType) {
      angular.extend(credentials, {
          //'client_id': vlCONSTANTS.API_Client_Id,
        'grant_type': grantType
      });

      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      var $http = $injector.get("$http");
	  var result = $http
        .post(appCONSTANTS.API_URL + "token", $.param(credentials), config);
		result.then(function(data){
          authorizationService.setAuthInfo(data);
        });
      return result;
        
    }
  }
})();
;(function() {
  'use strict';
  (function() {
    angular
      .module('core')
      .factory('unAuthenticatedInterceptor', unAuthenticatedInterceptor);

    unAuthenticatedInterceptor.$inject = ['$q','$rootScope','AUTH_EVENTS'];

    function unAuthenticatedInterceptor($q,$rootScope,AUTH_EVENTS) {
      var factory = {
        responseError: responseErrorInterceptor
      };
      return factory;

      function responseErrorInterceptor(rejection) {
          if(rejection.status == 403) {
              $rootScope.$broadcast(AUTH_EVENTS.failedToAuthorize);
          }else if (rejection.status == 401) {
            if (rejection.data=="password changed") {
              $rootScope.$broadcast(AUTH_EVENTS.passwordChanged);
            }
            else {
              $rootScope.$broadcast(AUTH_EVENTS.invalidToken);
            }
          }
          else if (rejection.status == 406) {
              $rootScope.$broadcast(AUTH_EVENTS.invalidRefreshToken);
          }
          //  else if (rejection.status == 400) {
          //     $rootScope.$broadcast(AUTH_EVENTS.refresh-token-failure);
          // }
          
          return $q.reject(rejection);
        }
    }


  })();



  //inject interceptor to $http
  (function() {
    angular
      .module("core")
      .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
      $httpProvider.interceptors.push('unAuthenticatedInterceptor');
    }
  })();

})();
;(function() {
  'use strict';
  (function() {
    angular
      .module('core')
      .factory('useTokenInterceptor', useTokenInterceptor);

    useTokenInterceptor.$inject = ['authenticationService','$localStorage'];


    function useTokenInterceptor(authenticationService,$localStorage) {
      var tokenInterceptor = {
        request: requestInterceptor
      };
      return tokenInterceptor;

      function requestInterceptor(config) {
          if (config.useToken) {
            return authenticationService.getToken()
              .then(function(data){
                config.headers['Authorization'] = data['token_type'] + " " + data['access_token'];
				if(config.params== null || config.params.lang ==null)
					config.headers['Accept-Language'] = $localStorage.language;//"en";
				else
					config.headers['Accept-Language'] = config.params.lang;
                if (!config.headers.hasOwnProperty('Content-Type')) 
                {
                    config.headers['Content-Type'] = 'application/json';
                }
                return config;
              });

          }
          return config;
        }
    }


  })();



  //inject interceptor to $http
  (function() {
    angular
      .module("core")
      .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
      $httpProvider.interceptors.push('useTokenInterceptor');
    }
  })();

})();
;(function() {
  'use strict';

  angular
    .module('core')
    .run(runBlock);

  runBlock.$inject = ['PermissionStore', 'authorizationService', 'userRolesEnum'];

  function runBlock(PermissionStore, authorizationService, userRolesEnum) {
    PermissionStore
      .definePermission('GlobalAdmin', function () {
          return authorizationService.hasRole(String(userRolesEnum.GlobalAdmin));
      });
  }

}());
;(function() {
    'use strict';
  
    angular
      .module('core')
      .run(runBlock);
  
    runBlock.$inject = ['PermissionStore', 'authorizationService', 'userRolesEnum'];
  
    function runBlock(PermissionStore, authorizationService, userRolesEnum) {
      PermissionStore
        .definePermission('RestaurantAdmin', function () {
            return authorizationService.hasRole(String(userRolesEnum.RestaurantAdmin));
        });
    }
  
  }());
  ;(function() {
  'use strict';

  angular
    .module('core')
    .run(runBlock);

  runBlock.$inject = ['PermissionStore','authorizationService'];

  function runBlock (PermissionStore, authorizationService){
    PermissionStore
      .definePermission('anonymous',function(){
        return !authorizationService.isLoggedIn();
      });
  }

}());
;(function() {
  'use strict';

 
  angular
    .module('core')
    .factory('authorizationService', authorizationService);

  authorizationService.$inject = ['$rootScope', '$localStorage', 'AUTH_EVENTS'];

  function authorizationService($rootScope, $localStorage, AUTH_EVENTS) {
    var factory = {
      getAuthInfo: getAuthInfo,
      getUser: getUser,
      hasRole: hasRole,
      isLoggedIn: isLoggedIn,
      logout: logout,
      setAuthInfo: setAuthInfo,
      isDisabled: false,
      isPasswordchanged:false
    };

    return factory;

   
    function isLoggedIn() {
      return !!$localStorage.authInfo;
    }

    
    function getAuthInfo() {
      return $localStorage.authInfo;
    }

    
    function getUser() {
      var info = getAuthInfo();
      return {
        name: info? info.Username : "",
        role: info ? info.Role : "",
        id: info ? info.UserId : "",
        PermissionId: info && info.PermissionId ? info.PermissionId.split(';'):[],
        userTypeId: info && info.TypeId ? info.TypeId:0
      };
    }

   
    function hasRole(role) {
      if (!isLoggedIn()) {
        return false;
      }
      // return JSON.parse(getAuthInfo().Roles).indexOf(role) > -1;
      return getAuthInfo().Role == role;
    }
	
    function logout() {
      $localStorage.authInfo = undefined;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function setAuthInfo(info) {
      $localStorage.authInfo = info.data;
      var currentDate = new Date();
      $localStorage.authInfo['expires_in'] = currentDate.setSeconds(currentDate.getSeconds() + $localStorage.authInfo['expires_in']);
    }
  }

}());
