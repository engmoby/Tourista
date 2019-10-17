(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('users', {
                    url: '/users',
                    templateUrl: './app/GlobalAdmin/user/templates/user.html',
                    controller: 'userController',
                    'controllerAs': 'userCtrl',
                    resolve: {
                        userPrepService: userPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['1'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('addUser', {
                    url: '/addUser',
                    templateUrl: './app/GlobalAdmin/user/templates/addUser.html',
                    controller: 'userController',
                    'controllerAs': 'userCtrl',

                    resolve: {
                        userPrepService: userPrepService,

                    },
                    data: {
                        permissions: {
                            only: ['1'],
                            redirectTo: 'root'
                        }
                    }


                })

                .state('editUser', {
                    url: '/editUser/:userId',
                    templateUrl: './app/GlobalAdmin/user/templates/editUser.html',
                    controller: 'editUserController',
                    'controllerAs': 'editUserCtrl',
                    resolve: {
                        EditUserPrepService: EditUserPrepService,
                        userPrepService: userPrepService,

                    },
                    data: {
                        permissions: {
                            only: ['1'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('Client', {
                    url: '/Clients',
                    templateUrl: './app/GlobalAdmin/Client/templates/Client.html',
                    controller: 'ClientController',
                    'controllerAs': 'ClientCtrl',
                    resolve: {
                        ClientPrepService: ClientPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['1'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('Country', {
                    url: '/Country',
                    templateUrl: './app/GlobalAdmin/Country/templates/Country.html',
                    controller: 'CountryController',
                    'controllerAs': 'CountryCtrl',
                    resolve: {
                        CountryPrepService: CountryPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newCountry', {
                    url: '/newCountry',
                    templateUrl: './app/GlobalAdmin/Country/templates/new.html',
                    controller: 'createCountryDialogController',
                    'controllerAs': 'newCountryCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editCountry', {
                    url: '/editCountry/:countryId',
                    templateUrl: './app/GlobalAdmin/Country/templates/edit.html',
                    controller: 'editCountryDialogController',
                    'controllerAs': 'editCountryCtrl',
                    resolve: {
                        CountryByIdPrepService: CountryByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('newCity', {
                    url: '/newCity/:countryId',
                    templateUrl: './app/GlobalAdmin/City/templates/new.html',
                    controller: 'createCityDialogController',
                    'controllerAs': 'newCityCtrl',
                    resolve: {
                        CountryByIdPrepService: CountryByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editCity', {
                    url: '/editCity/:cityId',
                    templateUrl: './app/GlobalAdmin/City/templates/edit.html',
                    controller: 'editCityDialogController',
                    'controllerAs': 'editCityCtrl',
                    resolve: {
                        CityByIdPrepService: CityByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('Career', {
                    url: '/Career',
                    templateUrl: './app/GlobalAdmin/Career/templates/Career.html',
                    controller: 'CareerController',
                    'controllerAs': 'CareerCtrl',
                    resolve: {
                        CareerPrepService: CareerPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newCareer', {
                    url: '/newCareer',
                    templateUrl: './app/GlobalAdmin/Career/templates/new.html',
                    controller: 'createCareerDialogController',
                    'controllerAs': 'newCareerCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editCareer', {
                    url: '/editCareer/:careerId',
                    templateUrl: './app/GlobalAdmin/Career/templates/edit.html',
                    controller: 'editCareerDialogController',
                    'controllerAs': 'editCareerCtrl',
                    resolve: {
                        CareerByIdPrepService: CareerByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })


                .state('CareerForm', {
                    url: '/CareerForm',
                    templateUrl: './app/GlobalAdmin/CareerForm/templates/CareerForm.html',
                    controller: 'CareerFormController',
                    'controllerAs': 'CareerFormCtrl',
                    resolve: {
                        CareerFormPrepService: CareerFormPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newCareerForm', {
                    url: '/newCareerForm',
                    templateUrl: './app/GlobalAdmin/CareerForm/templates/new.html',
                    controller: 'createCareerFormDialogController',
                    'controllerAs': 'newCareerFormCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editCareerForm', {
                    url: '/editCareerForm/:CareerFormId',
                    templateUrl: './app/GlobalAdmin/CareerForm/templates/edit.html',
                    controller: 'editCareerFormDialogController',
                    'controllerAs': 'editCareerFormCtrl',
                    resolve: {
                        CareerFormByIdPrepService: CareerFormByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('Currency', {
                    url: '/Currency',
                    templateUrl: './app/GlobalAdmin/Currency/templates/Currency.html',
                    controller: 'CurrencyController',
                    'controllerAs': 'CurrencyCtrl',
                    resolve: {
                        CurrencyPrepService: CurrencyPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newCurrency', {
                    url: '/newCurrency',
                    templateUrl: './app/GlobalAdmin/Currency/templates/new.html',
                    controller: 'createCurrencyDialogController',
                    'controllerAs': 'newCurrencyCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editCurrency', {
                    url: '/editCurrency/:currencyId',
                    templateUrl: './app/GlobalAdmin/Currency/templates/edit.html',
                    controller: 'editCurrencyDialogController',
                    'controllerAs': 'editCurrencyCtrl',
                    resolve: {
                        CurrencyByIdPrepService: CurrencyByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('Type', {
                    url: '/Type',
                    templateUrl: './app/GlobalAdmin/Type/templates/Type.html',
                    controller: 'TypeController',
                    'controllerAs': 'TypeCtrl',
                    resolve: {
                        TypePrepService: TypePrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newType', {
                    url: '/newType',
                    templateUrl: './app/GlobalAdmin/Type/templates/new.html',
                    controller: 'createTypeDialogController',
                    'controllerAs': 'newTypeCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editType', {
                    url: '/editType/:typeId',
                    templateUrl: './app/GlobalAdmin/Type/templates/edit.html',
                    controller: 'editTypeDialogController',
                    'controllerAs': 'editTypeCtrl',
                    resolve: {
                        TypeByIdPrepService: TypeByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('Feature', {
                    url: '/Feature',
                    templateUrl: './app/GlobalAdmin/Feature/templates/Feature.html',
                    controller: 'FeatureController',
                    'controllerAs': 'FeatureCtrl',
                    resolve: {
                        FeaturePrepService: FeaturePrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newFeature', {
                    url: '/newFeature',
                    templateUrl: './app/GlobalAdmin/Feature/templates/new.html',
                    controller: 'createFeatureDialogController',
                    'controllerAs': 'newFeatureCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editFeature', {
                    url: '/editFeature/:featureId',
                    templateUrl: './app/GlobalAdmin/Feature/templates/edit.html',
                    controller: 'editFeatureDialogController',
                    'controllerAs': 'editFeatureCtrl',
                    resolve: {
                        FeatureByIdPrepService: FeatureByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })


                .state('News', {
                    url: '/News',
                    templateUrl: './app/GlobalAdmin/News/templates/News.html',
                    controller: 'NewsController',
                    'controllerAs': 'NewsCtrl',
                    resolve: {
                        NewsPrepService: NewsPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newNews', {
                    url: '/newNews',
                    templateUrl: './app/GlobalAdmin/News/templates/new.html',
                    controller: 'createNewsDialogController',
                    'controllerAs': 'newNewsCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editNews', {
                    url: '/editNews/:newsId',
                    templateUrl: './app/GlobalAdmin/News/templates/edit.html',
                    controller: 'editNewsDialogController',
                    'controllerAs': 'editNewsCtrl',
                    resolve: {
                        NewsByIdPrepService: NewsByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })


                .state('Owner', {
                    url: '/Owner',
                    templateUrl: './app/GlobalAdmin/Owner/templates/Owner.html',
                    controller: 'OwnerController',
                    'controllerAs': 'OwnerCtrl',
                    resolve: {
                        OwnerPrepService: OwnerPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newOwner', {
                    url: '/newOwner',
                    templateUrl: './app/GlobalAdmin/Owner/templates/new.html',
                    controller: 'createOwnerDialogController',
                    'controllerAs': 'newOwnerCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editOwner', {
                    url: '/editOwner/:ownerId',
                    templateUrl: './app/GlobalAdmin/Owner/templates/edit.html',
                    controller: 'editOwnerDialogController',
                    'controllerAs': 'editOwnerCtrl',
                    resolve: {
                        OwnerByIdPrepService: OwnerByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })


                .state('Hotel', {
                    url: '/Hotel',
                    templateUrl: './app/GlobalAdmin/Hotel/templates/Hotel.html',
                    controller: 'HotelController',
                    'controllerAs': 'HotelCtrl',
                    resolve: {
                        HotelPrepService: HotelPrepService,
                        CountryPrepService: CountryPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newHotel', {
                    url: '/newHotel',
                    templateUrl: './app/GlobalAdmin/Hotel/templates/new.html',
                    controller: 'createHotelDialogController',
                    'controllerAs': 'newHotelCtrl',
                    resolve: {
                        HotelPrepService: HotelPrepService,
                        CountryPrepService: CountryPrepService,
                        FeaturePrepService: FeaturePrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editHotel', {
                    url: '/editHotel/:hotelId',
                    templateUrl: './app/GlobalAdmin/Hotel/templates/edit.html',
                    controller: 'editHotelDialogController',
                    'controllerAs': 'editHotelCtrl',
                    resolve: {
                        HotelByIdPrepService: HotelByIdPrepService,
                        CountryPrepService: CountryPrepService,
                        FeaturePrepService: FeaturePrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('Tour', {
                    url: '/Tour',
                    templateUrl: './app/GlobalAdmin/Tour/templates/Tour.html',
                    controller: 'TourController',
                    'controllerAs': 'TourCtrl',
                    resolve: {
                        TourPrepService: TourPrepService,
                        CountryPrepService: CountryPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newTour', {
                    url: '/newTour',
                    templateUrl: './app/GlobalAdmin/Tour/templates/new.html',
                    controller: 'createTourDialogController',
                    'controllerAs': 'newTourCtrl',
                    resolve: {
                        TourPrepService: TourPrepService,
                        CountryPrepService: CountryPrepService,
                        FeaturePrepService: FeaturePrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editTour', {
                    url: '/editTour/:TourId',
                    templateUrl: './app/GlobalAdmin/Tour/templates/edit.html',
                    controller: 'editTourDialogController',
                    'controllerAs': 'editTourCtrl',
                    resolve: {
                        TourByIdPrepService: TourByIdPrepService,
                        CountryPrepService: CountryPrepService,
                        FeaturePrepService: FeaturePrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })



                .state('Backage', {
                    url: '/Backage',
                    templateUrl: './app/GlobalAdmin/Backage/templates/Backage.html',
                    controller: 'BackageController',
                    'controllerAs': 'BackageCtrl',
                    resolve: {
                        BackagePrepService: BackagePrepService,
                        CountryPrepService: CountryPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newBackage', {
                    url: '/newBackage',
                    templateUrl: './app/GlobalAdmin/Backage/templates/new.html',
                    controller: 'createBackageDialogController',
                    'controllerAs': 'newBackageCtrl',
                    resolve: {
                        BackagePrepService: BackagePrepService,
                        CountryPrepService: CountryPrepService,
                        HotelPrepService: HotelPrepService,
                        TypePrepService: TypePrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editBackage', {
                    url: '/editBackage/:backageId',
                    templateUrl: './app/GlobalAdmin/Backage/templates/edit.html',
                    controller: 'editBackageDialogController',
                    'controllerAs': 'editBackageCtrl',
                    resolve: {
                        BackageByIdPrepService: BackageByIdPrepService,
                        CountryPrepService: CountryPrepService,
                        HotelPrepService: HotelPrepService,
                        TypePrepService: TypePrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })

                
                .state('BackageReservation', {
                    url: '/BackageReservation',
                    templateUrl: './app/GlobalAdmin/BackageReservation/templates/BackageReservation.html',
                    controller: 'BackageReservationController',
                    'controllerAs': 'BackageReservationCtrl',
                    resolve: {
                        BackageReservationPrepService: BackageReservationPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editBackageReservation', {
                    url: '/editBackageReservation/:backageReservationId',
                    templateUrl: './app/GlobalAdmin/BackageReservation/templates/edit.html',
                    controller: 'editBackageReservationDialogController',
                    'controllerAs': 'editBackageReservationCtrl',
                    resolve: {
                        BackageReservationByIdPrepService: BackageReservationByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })


                .state('Offer', {
                    url: '/Offer',
                    templateUrl: './app/GlobalAdmin/Offer/templates/Offer.html',
                    controller: 'OfferController',
                    'controllerAs': 'OfferCtrl',
                    resolve: {
                        OfferPrepService: OfferPrepService,
                        CountryPrepService: CountryPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newOffer', {
                    url: '/newOffer',
                    templateUrl: './app/GlobalAdmin/Offer/templates/new.html',
                    controller: 'createOfferDialogController',
                    'controllerAs': 'newOfferCtrl',
                    resolve: {
                        OfferPrepService: OfferPrepService,
                        CountryPrepService: CountryPrepService,
                        HotelPrepService: HotelPrepService,
                        TypePrepService: TypePrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editOffer', {
                    url: '/editOffer/:offerId',
                    templateUrl: './app/GlobalAdmin/Offer/templates/edit.html',
                    controller: 'editOfferDialogController',
                    'controllerAs': 'editOfferCtrl',
                    resolve: {
                        OfferByIdPrepService: OfferByIdPrepService,
                        CountryPrepService: CountryPrepService,
                        HotelPrepService: HotelPrepService,
                        TypePrepService: TypePrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                
                .state('OfferReservation', {
                    url: '/OfferReservation',
                    templateUrl: './app/GlobalAdmin/OfferReservation/templates/OfferReservation.html',
                    controller: 'OfferReservationController',
                    'controllerAs': 'OfferReservationCtrl',
                    resolve: {
                        OfferReservationPrepService: OfferReservationPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editOfferReservation', {
                    url: '/editOfferReservation/:offerReservationId',
                    templateUrl: './app/GlobalAdmin/OfferReservation/templates/edit.html',
                    controller: 'editOfferReservationDialogController',
                    'controllerAs': 'editOfferReservationCtrl',
                    resolve: {
                        OfferReservationByIdPrepService: OfferReservationByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('About', {
                    url: '/About',
                    templateUrl: './app/GlobalAdmin/About/templates/About.html',
                    controller: 'AboutController',
                    'controllerAs': 'AboutCtrl',
                    resolve: {
                        AboutPrepService: AboutPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editAbout', {
                    url: '/editAbout/:aboutId',
                    templateUrl: './app/GlobalAdmin/About/templates/edit.html',
                    controller: 'editAboutDialogController',
                    'controllerAs': 'editAboutCtrl',
                    resolve: {
                        AboutByIdPrepService: AboutByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('Contact', {
                    url: '/Contact',
                    templateUrl: './app/GlobalAdmin/Contact/templates/Contact.html',
                    controller: 'ContactController',
                    'controllerAs': 'ContactCtrl',
                    resolve: {
                        ContactPrepService: ContactPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editContact', {
                    url: '/editContact/:contactUsId',
                    templateUrl: './app/GlobalAdmin/Contact/templates/edit.html',
                    controller: 'editContactDialogController',
                    'controllerAs': 'editContactCtrl',
                    resolve: {
                        ContactByIdPrepService: ContactByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })


                .state('HotelReservation', {
                    url: '/HotelReservation',
                    templateUrl: './app/GlobalAdmin/HotelReservation/templates/HotelReservation.html',
                    controller: 'HotelReservationController',
                    'controllerAs': 'HotelReservationCtrl',
                    resolve: {
                        HotelReservationPrepService: HotelReservationPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editHotelReservation', {
                    url: '/editHotelReservation/:hotelReservationId',
                    templateUrl: './app/GlobalAdmin/HotelReservation/templates/edit.html',
                    controller: 'editHotelReservationDialogController',
                    'controllerAs': 'editHotelReservationCtrl',
                    resolve: {
                        HotelReservationByIdPrepService: HotelReservationByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('Dashboard', {
                    url: '/Dashboard',
                    templateUrl: './app/GlobalAdmin/dashboard/templates/dashboard.html',
                    controller: 'dashboardController',
                    'controllerAs': 'dashboardCtrl',
                    resolve: {
                        TicketDashboardPrepService: TicketDashboardPrepService,
                        // AnswerQuestionPrepService: AnswerQuestionPrepService

                    },
                    data: {
                        permissions: {
                            only: ['10'],
                            redirectTo: 'root'
                        }
                    }
                })

        });
    /*User */
    userPrepService.$inject = ['UserResource']
    function userPrepService(UserResource) {
        return UserResource.getAllUsers().$promise;
    }

    EditUserPrepService.$inject = ['UserResource', '$stateParams']
    function EditUserPrepService(GetUserResource, $stateParams) {
        return GetUserResource.getUser({ userId: $stateParams.userId }).$promise;
    }


    PermissionPrepService.$inject = ['PermissionResource']
    function PermissionPrepService(PermissionResource) {
        return PermissionResource.getAllPermissions().$promise;
    }
    /*Client */
    ClientPrepService.$inject = ['ClientResource']
    function ClientPrepService(ClientResource) {
        return ClientResource.getAllClients().$promise;
    }
    /*Country */
    CountryPrepService.$inject = ['CountryResource']
    function CountryPrepService(CountryResource) {
        return CountryResource.GetAllCountries().$promise;
    }

    AllCountryPrepService.$inject = ['CountryResource']
    function AllCountryPrepService(CountryResource) {
        return CountryResource.GetAllCountries({ pageSize: 0 }).$promise;
    }

    CountryByIdPrepService.$inject = ['CountryResource', '$stateParams']
    function CountryByIdPrepService(CountryResource, $stateParams) {
        return CountryResource.getCountry({ countryId: $stateParams.countryId }).$promise;
    }


    /*City */
    CityPrepService.$inject = ['CityResource']
    function CityPrepService(CityResource) {
        return CityResource.getAllCitys().$promise;
    }

    CityByIdPrepService.$inject = ['CityResource', '$stateParams']
    function CityByIdPrepService(CityResource, $stateParams) {
        return CityResource.getCity({ cityId: $stateParams.cityId }).$promise;
    }

    /*Career */
    CareerPrepService.$inject = ['CareerResource']
    function CareerPrepService(CareerResource) {
        return CareerResource.getAllCareers().$promise;
    }

    AllCareerPrepService.$inject = ['CareerResource']
    function AllCareerPrepService(CareerResource) {
        return CareerResource.getAllCareers({ pageSize: 0 }).$promise;
    }

    CareerByIdPrepService.$inject = ['CareerResource', '$stateParams']
    function CareerByIdPrepService(CareerResource, $stateParams) {
        return CareerResource.getCareer({ careerId: $stateParams.careerId }).$promise;
    }


    /*CareerForm */
    CareerFormPrepService.$inject = ['CareerFormResource']
    function CareerFormPrepService(CareerFormResource) {
        return CareerFormResource.getAllCareerForms().$promise;
    }

    AllCareerFormPrepService.$inject = ['CareerFormResource']
    function AllCareerFormPrepService(CareerFormResource) {
        return CareerFormResource.getAllCareerForms({ pageSize: 0 }).$promise;
    }

    CareerFormByIdPrepService.$inject = ['CareerFormResource', '$stateParams']
    function CareerFormByIdPrepService(CareerFormResource, $stateParams) {
        return CareerFormResource.getCareerForm({ CareerFormId: $stateParams.CareerFormId }).$promise;
    }


    /*Currency */
    CurrencyPrepService.$inject = ['CurrencyResource']
    function CurrencyPrepService(CurrencyResource) {
        return CurrencyResource.getAllCurrencies().$promise;
    }

    AllCurrencyPrepService.$inject = ['CurrencyResource']
    function AllCurrencyPrepService(CurrencyResource) {
        return CurrencyResource.getAllCurrencies({ pageSize: 0 }).$promise;
    }

    CurrencyByIdPrepService.$inject = ['CurrencyResource', '$stateParams']
    function CurrencyByIdPrepService(CurrencyResource, $stateParams) {
        return CurrencyResource.getCurrency({ currencyId: $stateParams.currencyId }).$promise;
    }


    /*Type */
    TypePrepService.$inject = ['TypeResource']
    function TypePrepService(TypeResource) {
        return TypeResource.getAllTypes().$promise;
    }

    AllTypePrepService.$inject = ['TypeResource']
    function AllTypePrepService(TypeResource) {
        return TypeResource.getAllTypes({ pageSize: 0 }).$promise;
    }

    TypeByIdPrepService.$inject = ['TypeResource', '$stateParams']
    function TypeByIdPrepService(TypeResource, $stateParams) {
        return TypeResource.getType({ typeId: $stateParams.typeId }).$promise;
    }

    /*Feature */
    FeaturePrepService.$inject = ['FeatureResource']
    function FeaturePrepService(FeatureResource) {
        return FeatureResource.getAllFeatures().$promise;
    }

    AllFeaturePrepService.$inject = ['FeatureResource']
    function AllFeaturePrepService(FeatureResource) {
        return FeatureResource.getAllFeatures({ pageSize: 0 }).$promise;
    }

    FeatureByIdPrepService.$inject = ['FeatureResource', '$stateParams']
    function FeatureByIdPrepService(FeatureResource, $stateParams) {
        return FeatureResource.getFeature({ featureId: $stateParams.featureId }).$promise;
    }



    /*News */
    NewsPrepService.$inject = ['NewsResource']
    function NewsPrepService(NewsResource) {
        return NewsResource.getAllNews().$promise;
    }

    AllNewsPrepService.$inject = ['NewsResource']
    function AllNewsPrepService(NewsResource) {
        return NewsResource.getAllNews({ pageSize: 0 }).$promise;
    }

    NewsByIdPrepService.$inject = ['NewsResource', '$stateParams']
    function NewsByIdPrepService(NewsResource, $stateParams) {
        return NewsResource.getNews({ newsId: $stateParams.newsId }).$promise;
    }

    /*Owner */
    OwnerPrepService.$inject = ['OwnerResource']
    function OwnerPrepService(OwnerResource) {
        return OwnerResource.getAllOwners().$promise;
    }

    AllOwnerPrepService.$inject = ['OwnerResource']
    function AllOwnerPrepService(OwnerResource) {
        return OwnerResource.getAllOwners({ pageSize: 0 }).$promise;
    }

    OwnerByIdPrepService.$inject = ['OwnerResource', '$stateParams']
    function OwnerByIdPrepService(OwnerResource, $stateParams) {
        return OwnerResource.getOwner({ ownerId: $stateParams.ownerId }).$promise;
    }

    /*Hotel */
    HotelPrepService.$inject = ['HotelResource']
    function HotelPrepService(HotelResource) {
        return HotelResource.GetAllHotels().$promise;
    }

    AllHotelPrepService.$inject = ['HotelResource']
    function AllHotelPrepService(HotelResource) {
        return HotelResource.GetAllHotels({ pageSize: 0 }).$promise;
    }

    HotelByIdPrepService.$inject = ['HotelResource', '$stateParams']
    function HotelByIdPrepService(HotelResource, $stateParams) {
        return HotelResource.getHotel({ hotelId: $stateParams.hotelId }).$promise;
    }



    /*Tour */
    TourPrepService.$inject = ['TourResource']
    function TourPrepService(TourResource) {
        return TourResource.GetAllTours().$promise;
    }

    AllTourPrepService.$inject = ['TourResource']
    function AllTourPrepService(TourResource) {
        return TourResource.GetAllTours({ pageSize: 0 }).$promise;
    }

    TourByIdPrepService.$inject = ['TourResource', '$stateParams']
    function TourByIdPrepService(TourResource, $stateParams) {
        return TourResource.getTour({ tourId: $stateParams.tourId }).$promise;
    }


    /*Backage */
    BackagePrepService.$inject = ['BackageResource']
    function BackagePrepService(BackageResource) {
        return BackageResource.GetAllBackages().$promise;
    }

    AllBackagePrepService.$inject = ['BackageResource']
    function AllBackagePrepService(BackageResource) {
        return BackageResource.GetAllBackages({ pageSize: 0 }).$promise;
    }

    BackageByIdPrepService.$inject = ['BackageResource', '$stateParams']
    function BackageByIdPrepService(BackageResource, $stateParams) {
        return BackageResource.getBackage({ backageId: $stateParams.backageId }).$promise;
    }

    /*BackageReservation */
    BackageReservationPrepService.$inject = ['BackageReservationResource']
    function BackageReservationPrepService(BackageReservationResource) {
        return BackageReservationResource.GetAllBackageReservation().$promise;
    }

    AllBackageReservationPrepService.$inject = ['BackageReservationResource']
    function AllBackageReservationPrepService(BackageReservationResource) {
        return BackageReservationResource.GetAllBackageReservation({ pageSize: 0 }).$promise;
    }

    BackageReservationByIdPrepService.$inject = ['BackageReservationResource', '$stateParams']
    function BackageReservationByIdPrepService(BackageReservationResource, $stateParams) {
        return BackageReservationResource.getBackageReservation({ backageReservationId: $stateParams.backageReservationId }).$promise;
    }

    /*Offer */
    OfferPrepService.$inject = ['OfferResource']
    function OfferPrepService(OfferResource) {
        return OfferResource.GetAllOffers().$promise;
    }

    AllOfferPrepService.$inject = ['OfferResource']
    function AllOfferPrepService(OfferResource) {
        return OfferResource.GetAllOffers({ pageSize: 0 }).$promise;
    }

    OfferByIdPrepService.$inject = ['OfferResource', '$stateParams']
    function OfferByIdPrepService(OfferResource, $stateParams) {
        return OfferResource.getOffer({ offerId: $stateParams.offerId }).$promise;
    }
    /*OfferReservation */
    OfferReservationPrepService.$inject = ['OfferReservationResource']
    function OfferReservationPrepService(OfferReservationResource) {
        return OfferReservationResource.GetAllOfferReservation().$promise;
    }

    AllOfferReservationPrepService.$inject = ['OfferReservationResource']
    function AllOfferReservationPrepService(OfferReservationResource) {
        return OfferReservationResource.GetAllOfferReservation({ pageSize: 0 }).$promise;
    }

    OfferReservationByIdPrepService.$inject = ['OfferReservationResource', '$stateParams']
    function OfferReservationByIdPrepService(OfferReservationResource, $stateParams) {
        return OfferReservationResource.getOfferReservation({ offerReservationId: $stateParams.offerReservationId }).$promise;
    }

    /*About */
    AboutPrepService.$inject = ['AboutResource']
    function AboutPrepService(AboutResource) {
        return AboutResource.GetAllAbout().$promise;
    }

    AllAboutPrepService.$inject = ['AboutResource']
    function AllAboutPrepService(AboutResource) {
        return AboutResource.GetAllAbout({ pageSize: 0 }).$promise;
    }

    AboutByIdPrepService.$inject = ['AboutResource', '$stateParams']
    function AboutByIdPrepService(AboutResource, $stateParams) {
        return AboutResource.getAbout({ aboutId: $stateParams.aboutId }).$promise;
    }


    /*Contact */
    ContactPrepService.$inject = ['ContactResource']
    function ContactPrepService(ContactResource) {
        return ContactResource.GetAllContact().$promise;
    }

    AllContactPrepService.$inject = ['ContactResource']
    function AllContactPrepService(ContactResource) {
        return ContactResource.GetAllContact({ pageSize: 0 }).$promise;
    }

    ContactByIdPrepService.$inject = ['ContactResource', '$stateParams']
    function ContactByIdPrepService(ContactResource, $stateParams) {
        return ContactResource.getContact({ contactUsId: $stateParams.contactUsId }).$promise;
    }



    /*HotelReservation */
    HotelReservationPrepService.$inject = ['HotelReservationResource']
    function HotelReservationPrepService(HotelReservationResource) {
        return HotelReservationResource.GetAllHotelReservation().$promise;
    }

    AllHotelReservationPrepService.$inject = ['HotelReservationResource']
    function AllHotelReservationPrepService(HotelReservationResource) {
        return HotelReservationResource.GetAllHotelReservation({ pageSize: 0 }).$promise;
    }

    HotelReservationByIdPrepService.$inject = ['HotelReservationResource', '$stateParams']
    function HotelReservationByIdPrepService(HotelReservationResource, $stateParams) {
        return HotelReservationResource.getHotelReservation({ hotelReservationId: $stateParams.hotelReservationId }).$promise;
    }


    TicketDashboardPrepService.$inject = ['dashboardResource']
    function TicketDashboardPrepService(dashboardResource) {
        return dashboardResource.getTicketsDashboard().$promise;
    }
}());
