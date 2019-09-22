(function () {
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
