(function() {
    'use strict';

      angular
      .module('home')
      .config(config)
      .run(runBlock);

      config.$inject = ['ngProgressLiteProvider'];
    runBlock.$inject = ['$rootScope', 'ngProgressLite' ];

      function config(ngProgressLiteProvider) {
      ngProgressLiteProvider.settings.speed = 1000;

      }

      function runBlock($rootScope, ngProgressLite ) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          startProgress();
      });
      var routingDoneEvents = ['$stateChangeSuccess', '$stateChangeError', '$stateNotFound'];

        angular.forEach(routingDoneEvents, function(event) {
        $rootScope.$on(event, function(event, toState, toParams, fromState, fromParams) {
          endProgress();
        });
      });

        function startProgress() {
        ngProgressLite.start();
      }

        function endProgress() {
        ngProgressLite.done();
      }

      }
  })();
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
                    url: '/editTour/:tourId',
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


                .state('TourReservation', {
                    url: '/TourReservation',
                    templateUrl: './app/GlobalAdmin/TourReservation/templates/TourReservation.html',
                    controller: 'TourReservationController',
                    'controllerAs': 'TourReservationCtrl',
                    resolve: {
                        TourReservationPrepService: TourReservationPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editTourReservation', {
                    url: '/editTourReservation/:tourReservationId',
                    templateUrl: './app/GlobalAdmin/TourReservation/templates/edit.html',
                    controller: 'editTourReservationDialogController',
                    'controllerAs': 'editTourReservationCtrl',
                    resolve: {
                        TourReservationByIdPrepService: TourReservationByIdPrepService
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


                .state('Inquery', {
                    url: '/Inquery',
                    templateUrl: './app/GlobalAdmin/Inquery/templates/Inquery.html',
                    controller: 'InqueryController',
                    'controllerAs': 'InqueryCtrl',
                    resolve: {
                        InqueryPrepService: InqueryPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newInquery', {
                    url: '/newInquery',
                    templateUrl: './app/GlobalAdmin/Inquery/templates/new.html',
                    controller: 'createInqueryDialogController',
                    'controllerAs': 'newInqueryCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editInquery', {
                    url: '/editInquery/:InqueryId',
                    templateUrl: './app/GlobalAdmin/Inquery/templates/edit.html',
                    controller: 'editInqueryDialogController',
                    'controllerAs': 'editInqueryCtrl',
                    resolve: {
                        InqueryByIdPrepService: InqueryByIdPrepService
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

                    },
                    data: {
                        permissions: {
                            only: ['10'],
                            redirectTo: 'root'
                        }
                    }
                })

        });
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
    ClientPrepService.$inject = ['ClientResource']
    function ClientPrepService(ClientResource) {
        return ClientResource.getAllClients().$promise;
    }
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


    CityPrepService.$inject = ['CityResource']
    function CityPrepService(CityResource) {
        return CityResource.getAllCitys().$promise;
    }

    CityByIdPrepService.$inject = ['CityResource', '$stateParams']
    function CityByIdPrepService(CityResource, $stateParams) {
        return CityResource.getCity({ cityId: $stateParams.cityId }).$promise;
    }

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


    InqueryPrepService.$inject = ['ContactFormResource']
    function InqueryPrepService(ContactFormResource) {
        return ContactFormResource.getAllInquerys().$promise;
    }

    AllInqueryPrepService.$inject = ['ContactFormResource']
    function AllInqueryPrepService(ContactFormResource) {
        return ContactFormResource.getAllInquerys({ pageSize: 0 }).$promise;
    }

    InqueryByIdPrepService.$inject = ['ContactFormResource', '$stateParams']
    function InqueryByIdPrepService(ContactFormResource, $stateParams) {
        return ContactFormResource.getInquery({ InqueryId: $stateParams.InqueryId }).$promise;
    }


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


    TourReservationPrepService.$inject = ['TourReservationResource']
    function TourReservationPrepService(TourReservationResource) {
        return TourReservationResource.GetAllTourReservation().$promise;
    }

    AllTourReservationPrepService.$inject = ['TourReservationResource']
    function AllTourReservationPrepService(TourReservationResource) {
        return TourReservationResource.GetAllTourReservation({ pageSize: 0 }).$promise;
    }

    TourReservationByIdPrepService.$inject = ['TourReservationResource', '$stateParams']
    function TourReservationByIdPrepService(TourReservationResource, $stateParams) {
        return TourReservationResource.getTourReservation({ tourReservationId: $stateParams.tourReservationId }).$promise;
    }

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
(function () {
    'use strict';

    angular
        .module('home')
        .controller('AboutController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'AboutResource', 'AboutPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', AboutController]); 
    function AboutController($rootScope, blockUI, $scope, $filter, $translate,
        $state, AboutResource, AboutPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[16].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = AboutPrepService.totalCount;
        $scope.AboutList = AboutPrepService;
        console.log($scope.AboutList);
        function refreshAbouts() {

            blockUI.start("Loading...");

            var k = AboutResource.GetAllCountries({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.AboutList = results
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
            refreshAbouts();
        }
        blockUI.stop();

    }

})();
(function () {
    angular
        .module('home')
        .factory('AboutResource', ['$resource', 'appCONSTANTS', AboutResource])

    function AboutResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'About/', {}, {
            GetAllAbout: { method: 'GET', url: appCONSTANTS.API_URL + 'About/GetAllAbout', isArray: true, useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'About/EditAbout', useToken: true },
            getAbout: { method: 'GET', url: appCONSTANTS.API_URL + 'About/GetAboutById/:AboutId', useToken: true }
        })
    }

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editAboutDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'AboutResource', 'ToastService',
            'AboutByIdPrepService', editAboutDialogController])

    function editAboutDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, AboutResource, ToastService, AboutByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.About = AboutByIdPrepService; 
      console.log( vm.About);
        vm.Close = function () {
            $state.go('About');
        }
        vm.UpdateAbout = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new AboutResource();
            updateObj.aboutId = vm.About.aboutId;
            updateObj.descriptionDictionary = vm.About.descriptionDictionary; 
            updateObj.videoUrl = vm.About.videoUrl; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('About');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('BackageController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'BackageResource', 'BackagePrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', BackageController]);


    function BackageController($rootScope, blockUI, $scope, $filter, $translate,
        $state, BackageResource, BackagePrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = BackagePrepService.totalCount;
        $scope.BackageList = BackagePrepService;
        console.log($scope.BackageList);
        function refreshBackages() {

            blockUI.start("Loading...");

            var k = BackageResource.GetAllBackages({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.BackageList = results
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
            refreshBackages();
        }
        blockUI.stop();

    }

})();
(function () {
    angular
      .module('home')
        .factory('BackageResource', ['$resource', 'appCONSTANTS', BackageResource]) 

    function BackageResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Backages/', {}, {
            GetAllBackages: { method: 'GET', url: appCONSTANTS.API_URL + 'Backages/GetAllBackages', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Backages/EditBackage', useToken: true },
            getBackage: { method: 'GET', url: appCONSTANTS.API_URL + 'Backages/GetBackageById/:BackageId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createBackageDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService', 'HotelPrepService', 'TypePrepService', 'BackageResource', 'ToastService', '$rootScope', createBackageDialogController])

    function createBackageDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        HotelPrepService, TypePrepService, BackageResource, ToastService, $rootScope) {

        blockUI.start("Loading...");
        function init() {
            $scope.selectedCountry = { CountryId: 0, titleDictionary: { "en": "Select Country", "ar": "اختار منطقه" } };
            $scope.CountryList = [];
            $scope.CountryList.push($scope.selectedCountry);
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results)

            $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
            $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
            debugger;
            $scope.HotelList = HotelPrepService.results;
            $scope.TypeList = TypePrepService.results;
        }
        init();

        $scope.CountryChange = function () {
            for (var i = $scope.CountryList.length - 1; i >= 0; i--) {
                if ($scope.CountryList[i].CountryId == 0) {
                    $scope.CountryList.splice(i, 1);
                }
            }
            $scope.CityList = [];
            $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
            $scope.CityList.push($scope.selectedCity);
            $scope.CityList = $scope.CityList.concat($scope.selectedCountry.cityes);
        }

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Backage');
        }



        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.AddNewBackage = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var newBackage = new Object();
            newBackage.titleDictionary = vm.titleDictionary;
            newBackage.descriptionDictionary = vm.descriptionDictionary;
            newBackage.star = vm.star;
            newBackage.cityId = $scope.selectedCity.cityId;
            newBackage.daysCount = vm.daysCount;
            newBackage.nigthsCount = vm.nigthsCount;
            newBackage.price = vm.price;
            newBackage.hotelId = vm.selectedHotel.hotelId;
            newBackage.typeId = vm.selectedType.typeId;

            var model = new FormData();
            model.append('data', JSON.stringify(newBackage));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Backages/',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('Backage')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    blockUI.stop();
                }
                );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            debugger; var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.newBackageForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
            vm.files.splice(index, 1);
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editBackageDialogController', ['$scope', '$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService', 'BackageResource', 'ToastService', 'HotelPrepService','TypePrepService', 'BackageByIdPrepService', editBackageDialogController])

    function editBackageDialogController($scope, $filter, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        BackageResource, ToastService, HotelPrepService,TypePrepService, BackageByIdPrepService) {
        blockUI.start("Loading...");
        function init() {
            $scope.CountryList = [];
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results)
            $scope.HotelList = HotelPrepService.results;
            $scope.TypeList = TypePrepService.results;

            $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
        }
        init(); 

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Backage = BackageByIdPrepService;
        vm.RemoveImages = [];
        vm.CheckImages = [];
        vm.selectedHotel = [];
        console.log(vm.Backage);
        vm.CheckImages.push(vm.Backage.imagesURL);


        var indexHotel = $scope.HotelList.indexOf($filter('filter')($scope.HotelList, { 'hotelId': vm.Backage.hotel.hotelId }, true)[0]);
        $scope.selectedHotel = $scope.HotelList[indexHotel];

        var indexType = $scope.TypeList.indexOf($filter('filter')($scope.TypeList, { 'typeId': vm.Backage.type.typeId }, true)[0]);
        $scope.selectedType = $scope.TypeList[indexType];

        var indexCountry = $scope.CountryList.indexOf($filter('filter')($scope.CountryList, { 'countryId': vm.Backage.city.countryId }, true)[0]);
        $scope.selectedCountry = $scope.CountryList[indexCountry];


        $scope.CityList = $scope.selectedCountry.cityes;
        var indexCity = $scope.selectedCountry.cityes.indexOf($filter('filter')($scope.selectedCountry.cityes, { 'cityId': vm.Backage.city.cityId }, true)[0]);
        $scope.selectedCity = $scope.selectedCountry.cityes[indexCity];

        $scope.CountryChange = function () {
            for (var i = $scope.CountryList.length - 1; i >= 0; i--) {
                if ($scope.CountryList[i].CountryId == 0) {
                    $scope.CountryList.splice(i, 1);
                }
            }
            $scope.CityList = [];
            $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
            $scope.CityList.push($scope.selectedCity);
            $scope.CityList = $scope.CityList.concat($scope.selectedCountry.cityes);
        }

        vm.Close = function () {
            $state.go('Backage');
        }
        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.UpdateBackage = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var updateObj = new Object();
            updateObj.backageId = vm.Backage.backageId;
            updateObj.titleDictionary = vm.Backage.titleDictionary;
            updateObj.descriptionDictionary = vm.Backage.descriptionDictionary;
            updateObj.star = vm.Backage.star;
            updateObj.cityId = $scope.selectedCity.cityId; 
            updateObj.removeImages = vm.RemoveImages; 
            updateObj.daysCount = vm.Backage.daysCount;
            updateObj.nigthsCount = vm.Backage.nigthsCount;
            updateObj.price = vm.Backage.price;
            updateObj.hotelId = $scope.selectedHotel.hotelId;
            updateObj.typeId = $scope.selectedType.typeId;


            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Backages/EditBackage',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('Backage')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    blockUI.stop();
                }
                );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.UpdateBackageForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            vm.CheckImages.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
            vm.RemoveImages.push(index);
            vm.files.splice(index, 1);
            vm.CheckImages.splice(index, 1);
        }

        vm.removeBackageFile = function (index) {
            vm.CheckImages.splice(index, 1);
            vm.Backage.imagesURL.splice(index, 1);
        }
    }
}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('BackageReservationController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'BackageReservationResource', 'BackageReservationPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', BackageReservationController]);


    function BackageReservationController($rootScope, blockUI, $scope, $filter, $translate,
        $state, BackageReservationResource, BackageReservationPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.StatusList = appCONSTANTS.Status;
        $scope.totalCount = BackageReservationPrepService.totalCount;
        $scope.BackageReservationList = BackageReservationPrepService; 
      console.log( $scope.BackageReservationList);
        function refreshBackageReservations() {

            blockUI.start("Loading..."); 

                        var k = BackageReservationResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.BackageReservationList = results  
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
            refreshBackageReservations();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('BackageReservationResource', ['$resource', 'appCONSTANTS', BackageReservationResource]) 

    function BackageReservationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'BackageReservations/', {}, {
            GetAllBackageReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'BackageReservations/GetAllBackageReservations', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'BackageReservations/EditBackageReservation', useToken: true },
            getBackageReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'BackageReservations/GetBackageReservationById/:BackageReservationId', useToken: true }
        })
    } 

}());

(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editBackageReservationDialogController', ['$scope','$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'BackageReservationResource', 'ToastService',
            'BackageReservationByIdPrepService', editBackageReservationDialogController])

    function editBackageReservationDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, BackageReservationResource, ToastService, BackageReservationByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
        $scope.StatusList = appCONSTANTS.Status;
		vm.language = appCONSTANTS.supportedLanguage;
        vm.BackageReservation = BackageReservationByIdPrepService; 
        console.log( vm.BackageReservation);

               var indexStatus = $scope.StatusList.indexOf($filter('filter')($scope.StatusList, { 'id': vm.BackageReservation.status }, true)[0]);
        $scope.selectedStatus=$scope.StatusList[indexStatus];


        vm.Close = function () {
            $state.go('BackageReservation');
        }
        vm.UpdateBackageReservation = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new BackageReservationResource();
            updateObj.backageReservationId = vm.BackageReservation.backageReservationId; 
            updateObj.adult = vm.BackageReservation.adult; 
            updateObj.roomCount = vm.BackageReservation.roomCount; 
            updateObj.child = vm.BackageReservation.child; 
            updateObj.status = $scope.selectedStatus.id; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('BackageReservation');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('CareerController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CareerResource', 'CareerPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', CareerController]);


    function CareerController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CareerResource, CareerPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[10].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.totalCount = CareerPrepService.totalCount;
        $scope.CareerList = CareerPrepService;
        console.log(  $scope.CareerList);
        function refreshCareers() {

            blockUI.start("Loading..."); 

                        var k = CareerResource.getAllCareers({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.CareerList = results  
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
            refreshCareers();
        }
        blockUI.stop();

            }

})();
(function () {

    angular
        .module('home')
        .factory('CareerResource', ['$resource', 'appCONSTANTS', CareerResource])

    function CareerResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Careers/', {}, {
            getAllCareers: { method: 'GET', url: appCONSTANTS.API_URL + 'Careers/GetAllCareers', isArray: true, useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Careers/EditCareer', useToken: true },
            getCareer: { method: 'GET', url: appCONSTANTS.API_URL + 'Careers/GetCareerById/:CareerId', useToken: true }
        })
    }

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createCareerDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CareerResource', 'ToastService', '$rootScope', createCareerDialogController])

    function createCareerDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CareerResource,
        ToastService, $rootScope) {

                blockUI.start("Loading..."); 

            		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Career');
		} 

		 		vm.AddNewCareer = function () {
            blockUI.start("Loading..."); 
            debugger;
            var newObj = new CareerResource();

                 newObj.title = vm.title; 
            newObj.description= vm.description; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Career');
                     blockUI.stop();        


                },
                function (data, status) {
               blockUI.stop();        

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

  	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editCareerDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
         'CareerResource', 'ToastService',            'CareerByIdPrepService', editCareerDialogController])

    function editCareerDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, 
        CareerResource, ToastService, CareerByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Career = CareerByIdPrepService; 
        console.log( vm.Career)
        vm.Close = function () {
            $state.go('Career');
        }
        vm.UpdateCareer = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new CareerResource();

                        updateObj.title = vm.Career.title; 
            updateObj.description= vm.Career.description; 
            updateObj.careerId = vm.Career.careerId; 
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Career');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('CareerFormController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CareerFormResource', 'CareerFormPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', CareerFormController])


    .directive('modal', function () {
        return {
            template: '<div class="modal fade">' +
                '<div class="modal-dialog">' +
                  '<div class="modal-content">' +
                    '<div class="modal-header">' +
                      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                      '<h4 class="modal-title">{{ title }}</h4>' +
                    '</div>' +
                    '<div class="modal-body" ng-transclude></div>' +
                  '</div>' +
                '</div>' +
              '</div>',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function (value) {
                    if (value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    });
    function CareerFormController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CareerFormResource, CareerFormPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {
        $scope.FrontServer = appCONSTANTS.FrontServer_URL;
        $scope.showModal = false;
        $scope.toggleModal = function (obj) {
            $scope.showModal = !$scope.showModal;
            $scope.showmessage = obj.message;
        };


        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[11].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = CareerFormPrepService.totalCount;
        $scope.CareerFormList = CareerFormPrepService;
        console.log($scope.CareerFormList);
        function refreshCareerForms() {

            blockUI.start("Loading...");

            var k = CareerFormResource.getAllCareerForms({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.CareerFormList = results
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
            refreshCareerForms();
        }
        blockUI.stop();

    }


})();
(function () {

        angular
      .module('home')
        .factory('CareerFormResource', ['$resource', 'appCONSTANTS', CareerFormResource]) 

    function CareerFormResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'CareerForms/', {}, {
            getAllCareerForms: { method: 'GET', url: appCONSTANTS.API_URL + 'CareerForms/GetAllCareerForms', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'CareerForms/EditCareerForm', useToken: true },
            getCareerForm: { method: 'GET', url: appCONSTANTS.API_URL + 'CareerForms/GetCareerFormById/:CareerFormId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createCareerFormDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CareerFormResource', 'ToastService', '$rootScope', createCareerFormDialogController])

    function createCareerFormDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CareerFormResource,
        ToastService, $rootScope) {

                blockUI.start("Loading..."); 

            		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('CareerForm');
		} 

		 		vm.AddNewCareerForm = function () {
            blockUI.start("Loading..."); 
            debugger;
            var newObj = new CareerFormResource();

                 newObj.title = vm.title; 
            newObj.description= vm.description; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('CareerForm');
                     blockUI.stop();        


                },
                function (data, status) {
               blockUI.stop();        

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

  	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editCareerFormDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
         'CareerFormResource', 'ToastService',            'CareerFormByIdPrepService', editCareerFormDialogController])

    function editCareerFormDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, 
        CareerFormResource, ToastService, CareerFormByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.CareerForm = CareerFormByIdPrepService; 
        console.log( vm.CareerForm)
        vm.Close = function () {
            $state.go('CareerForm');
        }
        vm.UpdateCareerForm = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new CareerFormResource();

                        updateObj.title = vm.CareerForm.title; 
            updateObj.description= vm.CareerForm.description; 
            updateObj.CareerFormId = vm.CareerForm.CareerFormId; 
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('CareerForm');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('CityController', ['$rootScope', '$scope', '$filter', '$translate',
            '$state', 'CityResource',   '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', CityController]);


    function CityController($rootScope, $scope, $filter, $translate,
        $state, CityResource,  $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        blockUI.start("Loading..."); 

                    refreshCitys();

        function refreshCitys() {
           blockUI.start("Loading..."); 

                        var k = CityResource.getAllCitys().$promise.then(function (results) {
                $scope.CityList = results;
                blockUI.stop();

                            },
            function (data, status) {
                blockUI.stop();

                                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }

    }

})();
(function () {
    angular
      .module('home')
        .factory('CityResource', ['$resource', 'appCONSTANTS', CityResource]) 

    function CityResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Cities/', {}, {
            getAllCities: { method: 'GET', url: appCONSTANTS.API_URL + 'Cities/GetAllCities', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Cities/EditCity', useToken: true },
            getCity: { method: 'GET', url: appCONSTANTS.API_URL + 'Cities/GetCityById/:CityId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createCityDialogController', ['$scope', '$http', '$state', 'appCONSTANTS', '$translate',
            'CityResource', 'ToastService', '$rootScope', 'CountryByIdPrepService', createCityDialogController])

    function createCityDialogController($scope, $http, $state, appCONSTANTS, $translate, CityResource,
        ToastService, $rootScope, CountryByIdPrepService) {
		var vm = this;
		vm.Country = CountryByIdPrepService;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
		    $state.go('Country');
		} 

		 		vm.AddNewCity = function () {
            var newObj = new CityResource();
		    newObj.countryId = vm.Country.countryId;
            newObj.titleDictionary = vm.titleDictionary;
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Country');

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

  	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editCityDialogController', ['$scope', '$http', '$state', 'appCONSTANTS', '$translate', 'CityResource', 'ToastService',
            'CityByIdPrepService', editCityDialogController])

    function editCityDialogController($scope, $http, $state, appCONSTANTS, $translate, CityResource, ToastService, CityByIdPrepService) {
		var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.City = CityByIdPrepService; 
        vm.close = function () {
            $state.go('Country');
        }
        vm.UpdateCity = function () { 
            var updateObj = new CityResource();
            updateObj.cityId = vm.City.cityId;
            updateObj.titleDictionary = vm.City.titleDictionary;
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Country');

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('ClientController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate', '$state', 'ClientResource',  
            'ClientPrepService',   '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', ClientController]);

    function ClientController($rootScope, blockUI, $scope, $filter, $translate, $state, ClientResource,    ClientPrepService, 
          $localStorage, authorizationService, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[8].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = ClientPrepService.totalCount;
        $scope.ClientList = ClientPrepService.results;  
console.log( $scope.ClientList);
        $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
        $scope.ClientObj = "";
        $scope.selectedType = ""; 
        $scope.ClientTypeList = appCONSTANTS.ClientType;

               function refreshClients() {
            blockUI.start("Loading...");

            var k = ClientResource.getAllClients({ page: vm.currentPage }).$promise.then(function (results) {
                vm.getPageData = results;
                $scope.ClientList = vm.getPageData.results; 
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }



               $scope.AddNewclient = function () {
            blockUI.start("Loading...");

            var newClient = new ClientResource(); 
            newClient.Fullname = $scope.fullName; 
            newClient.Title = $scope.title; 
            newClient.Phone = $scope.Phone;
            newClient.WhatsApp = $scope.whatsApp;
            newClient.Email = $scope.Email;
            newClient.Password = $scope.Password;
            newClient.ClientType = $scope.selectedType;
            newClient.IsDeleted = false;
            newClient.IsSystemClient = true;

            newClient.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");

                    localStorage.setItem('data', JSON.stringify(data.ClientId));
                    $state.go('Clients');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshClients();
        }

        blockUI.stop();

    }

}());(function () {
    angular
        .module('home')
        .factory('ClientResource', ['$resource', 'appCONSTANTS', ClientResource])

    function ClientResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Users/', {}, {
            getAllClients: { method: 'GET', url: appCONSTANTS.API_URL + 'Users/GetAllUsers', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Users/EditRegisterUser', useToken: true },
            getUser: { method: 'GET', url: appCONSTANTS.API_URL + 'Users/GetUserById/:UserId', useToken: true }, 
        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')


            .controller('editUserController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate', '$state', 'UserResource',  
            'userPrepService',  'EditUserPrepService', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', editUserController]);

    function editUserController($rootScope, blockUI, $scope, $filter, $translate, $state, UserResource,    userPrepService, EditUserPrepService,
          $localStorage, authorizationService, appCONSTANTS, ToastService) {

        blockUI.start("Loading...");

        $scope.isPaneShown = true;
        $scope.$emit('LOAD')
        var vm = this;


                 vm.show = true;  
        $scope.userObj = EditUserPrepService;
        $scope.userObj.confirmPassword = $scope.userObj.password;
        $scope.userTypeList = appCONSTANTS.UserType;

         $scope.selectedType = "";
        console.log($scope.userObj);

               var indexType = $scope.userTypeList.indexOf($filter('filter')($scope.userTypeList, { 'id': $scope.userObj.userType }, true)[0]);
        $scope.selectedType=$scope.userTypeList[indexType]; 




               $scope.Updateclient = function () {
            blockUI.start("Loading..."); 
            var updateClient = new UserResource();
            updateClient.UserId = $scope.userObj.userId;
            updateClient.Fullname = $scope.userObj.fullName; 
            updateClient.Title = $scope.userObj.title; 
            updateClient.Phone = $scope.userObj.phone;
            updateClient.WhatsApp = $scope.userObj.whatsApp;
            updateClient.Email = $scope.userObj.email;
            updateClient.Password = $scope.userObj.password;
            updateClient.IsDeleted = false; 
            updateClient.UserType = $scope.selectedType.id; 
            updateClient.$update().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    $state.go('users');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();


    }

})();(function () {
    'use strict';

    angular
        .module('home')
        .controller('ContactController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'ContactResource', 'ContactPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', ContactController]);


    function ContactController($rootScope, blockUI, $scope, $filter, $translate,
        $state, ContactResource, ContactPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[17].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = ContactPrepService.totalCount;
        $scope.ContactList = ContactPrepService;
        console.log($scope.ContactList);
        function refreshContacts() {

            blockUI.start("Loading...");

            var k = ContactResource.GetAllCountries({ page: vm.currentPage }).$promise.then(function (results) {
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
(function () {
    angular
      .module('home')
        .factory('ContactResource', ['$resource', 'appCONSTANTS', ContactResource]) 

    function ContactResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Contact/', {}, {
            GetAllContact: { method: 'GET', url: appCONSTANTS.API_URL + 'Contact/GetAllContact',isArray:true, useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Contact/EditContact', useToken: true },
            getContact: { method: 'GET', url: appCONSTANTS.API_URL + 'Contact/GetContactById/:ContactId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editContactDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'ContactResource', 'ToastService',
            'ContactByIdPrepService', editContactDialogController])

    function editContactDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ContactResource, ToastService, ContactByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Contact = ContactByIdPrepService; 
      console.log( vm.Contact);
        vm.Close = function () {
            $state.go('Contact');
        }
        vm.UpdateContact = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new ContactResource();
            updateObj.contactUsId = vm.Contact.contactUsId;
            updateObj.addressDictionary = vm.Contact.addressDictionary; 
            updateObj.mail = vm.Contact.mail; 
            updateObj.mail1 = vm.Contact.mail1; 
            updateObj.mail2 = vm.Contact.mail2; 
            updateObj.fax = vm.Contact.fax; 
            updateObj.phone = vm.Contact.phone; 
            updateObj.phone1 = vm.Contact.phone1; 
            updateObj.phone2 = vm.Contact.phone2; 
            updateObj.facebook = vm.Contact.facebook; 
            updateObj.instgram = vm.Contact.instgram; 
            updateObj.twitter = vm.Contact.twitter; 
            updateObj.linkedIn = vm.Contact.linkedIn; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Contact');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('CountryController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CountryResource', 'CountryPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', CountryController]);


    function CountryController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CountryResource, CountryPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[9].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.totalCount = CountryPrepService.totalCount;
        $scope.CountryList = CountryPrepService; 
      console.log( $scope.CountryList);
        function refreshCountrys() {

            blockUI.start("Loading..."); 

                        var k = CountryResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.CountryList = results  
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
            refreshCountrys();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('CountryResource', ['$resource', 'appCONSTANTS', CountryResource]) 

    function CountryResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Countries/', {}, {
            GetAllCountries: { method: 'GET', url: appCONSTANTS.API_URL + 'Countries/GetAllCountries', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Countries/EditCountry', useToken: true },
            getCountry: { method: 'GET', url: appCONSTANTS.API_URL + 'Countries/GetCountryById/:CountryId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createCountryDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryResource', 'ToastService', '$rootScope', createCountryDialogController])

    function createCountryDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryResource,
        ToastService, $rootScope) {

                blockUI.start("Loading..."); 

            		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Country');
		} 

		 		vm.AddNewCountry = function () {
            blockUI.start("Loading..."); 

                        var newObj = new CountryResource();
            newObj.titleDictionary = vm.titleDictionary; 
            newObj.IsDeleted = false; 
            newObj.IsStatic =false;
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Country');
                     blockUI.stop();        


                },
                function (data, status) {
               blockUI.stop();        

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

  	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editCountryDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'CountryResource', 'ToastService',
            'CountryByIdPrepService', editCountryDialogController])

    function editCountryDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryResource, ToastService, CountryByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Country = CountryByIdPrepService; 
      console.log( vm.Country);
        vm.Close = function () {
            $state.go('Country');
        }
        vm.UpdateCountry = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new CountryResource();
            updateObj.countryId = vm.Country.countryId;
            updateObj.titleDictionary = vm.Country.titleDictionary;
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Country');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('CurrencyController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CurrencyResource', 'CurrencyPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', CurrencyController]);


    function CurrencyController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CurrencyResource, CurrencyPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.totalCount = CurrencyPrepService.totalCount;
        $scope.CurrencyList = CurrencyPrepService;
        function refreshCurrencys() {

            blockUI.start("Loading..."); 

                        var k = CurrencyResource.getAllCurrencies({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.CurrencyList = results  
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
            refreshCurrencys();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('CurrencyResource', ['$resource', 'appCONSTANTS', CurrencyResource]) 

    function CurrencyResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Currencies/', {}, {
            getAllCurrencies: { method: 'GET', url: appCONSTANTS.API_URL + 'Currencies/GetAllCurrencies', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Currencies/EditCurrency', useToken: true },
            getCurrency: { method: 'GET', url: appCONSTANTS.API_URL + 'Currencies/GetCurrencyById/:CurrencyId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createCurrencyDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CurrencyResource', 'ToastService', '$rootScope', createCurrencyDialogController])

    function createCurrencyDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CurrencyResource,
        ToastService, $rootScope) {

                blockUI.start("Loading..."); 

            		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Currency');
		} 

		 		vm.AddNewCurrency = function () {
            blockUI.start("Loading..."); 

                        var newObj = new CurrencyResource();
            newObj.titleDictionary = vm.titleDictionary; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Currency');
                     blockUI.stop();        


                },
                function (data, status) {
               blockUI.stop();        

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

  	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editCurrencyDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'CurrencyResource', 'ToastService',
            'CurrencyByIdPrepService', editCurrencyDialogController])

    function editCurrencyDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CurrencyResource, ToastService, CurrencyByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Currency = CurrencyByIdPrepService; 
        vm.Close = function () {
            $state.go('Currency');
        }
        vm.UpdateCurrency = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new CurrencyResource();
            updateObj.currencyId = vm.Currency.currencyId;
            updateObj.titleDictionary = vm.Currency.titleDictionary;
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Currency');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
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
(function () {
    angular
      .module('home')
        .factory('FeatureResource', ['$resource', 'appCONSTANTS', FeatureResource]) 

    function FeatureResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Features/', {}, {
            getAllFeatures: { method: 'GET', url: appCONSTANTS.API_URL + 'Features/GetAllFeatures', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Features/EditFeature', useToken: true },
            getFeature: { method: 'GET', url: appCONSTANTS.API_URL + 'Features/GetFeatureById/:FeatureId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createFeatureDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'FeatureResource', 'ToastService', '$rootScope', createFeatureDialogController])

    function createFeatureDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, FeatureResource,
        ToastService, $rootScope) {

                blockUI.start("Loading..."); 

            		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Feature');
		} 





        blockUI.stop();

          vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.AddNewFeature = function () {
            debugger;
        blockUI.start("Loading..."); 
        vm.isChanged = true;
            var newObj = new Object();
            newObj.titleDictionary = vm.titleDictionary;  
            newObj.IsDeleted = false;  

            var model = new FormData();
            model.append('data', JSON.stringify(newObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Features/',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                                       blockUI.stop();
                     $state.go('Feature')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        blockUI.stop();
    }
                );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
          debugger;  var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.newFeatureForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
            vm.files.splice(index, 1);
        }
	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editFeatureDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'FeatureResource', 'ToastService',
            'FeatureByIdPrepService', editFeatureDialogController])

    function editFeatureDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, FeatureResource, ToastService, FeatureByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Feature = FeatureByIdPrepService; 
        vm.RemoveImages = []; 
        vm.CheckImages = []; 
         vm.CheckImages.push(vm.Feature.icon);
        vm.Close = function () {
            $state.go('Feature');
        }
        vm.UpdateFeature = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new FeatureResource();
            updateObj.featureId = vm.Feature.featureId;
            updateObj.titleDictionary = vm.Feature.titleDictionary;
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Feature');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.isChanged = false;
        blockUI.stop();

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.UpdateFeature = function () {
            debugger;
        blockUI.start("Loading..."); 
        vm.isChanged = true;
            var updateObj = new Object();
            updateObj.featureId = vm.Feature.featureId;
            updateObj.titleDictionary = vm.Feature.titleDictionary;
		    updateObj.IsDeleted = false; 

                    var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Features/EditFeature',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                                       blockUI.stop();
                     $state.go('Feature')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        blockUI.stop();
    }
                );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.UpdateFeatureForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            vm.CheckImages.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
           vm.RemoveImages.push(index);
            vm.files.splice(index, 1);
            vm.CheckImages.splice(index, 1);
        }

	        vm.removeFeatureFile = function (index) { 
            vm.CheckImages.splice(index, 1);
            vm.Feature.imagesURL.splice(index, 1);
        }}


         	}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('HotelController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'HotelResource', 'HotelPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', HotelController]);


    function HotelController($rootScope, blockUI, $scope, $filter, $translate,
        $state, HotelResource, HotelPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[7].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.totalCount = HotelPrepService.totalCount;
        $scope.HotelList = HotelPrepService; 
      console.log( $scope.HotelList);
        function refreshHotels() {

            blockUI.start("Loading..."); 

                        var k = HotelResource.GetAllHotels({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.HotelList = results  
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
            refreshHotels();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('HotelResource', ['$resource', 'appCONSTANTS', HotelResource]) 

    function HotelResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Hotels/', {}, {
            GetAllHotels: { method: 'GET', url: appCONSTANTS.API_URL + 'Hotels/GetAllHotels', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Hotels/EditHotel', useToken: true },
            getHotel: { method: 'GET', url: appCONSTANTS.API_URL + 'Hotels/GetHotelById/:HotelId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createHotelDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService', 'FeaturePrepService', 'HotelResource', 'ToastService', '$rootScope', createHotelDialogController])

    function createHotelDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        FeaturePrepService, HotelResource, ToastService, $rootScope) {

        blockUI.start("Loading...");
        function init() {
            $scope.selectedCountry = { CountryId: 0, titleDictionary: { "en": "Select Country", "ar": "اختار منطقه" } };
            $scope.CountryList = [];
            $scope.CountryList.push($scope.selectedCountry);
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results)

            $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
            $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
            debugger;
            $scope.FeatureList = FeaturePrepService.results;
        }
        init();

        $scope.CountryChange = function () {
            for (var i = $scope.CountryList.length - 1; i >= 0; i--) {
                if ($scope.CountryList[i].CountryId == 0) {
                    $scope.CountryList.splice(i, 1);
                }
            }
            $scope.CityList = [];
            $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
            $scope.CityList.push($scope.selectedCity);
            $scope.CityList = $scope.CityList.concat($scope.selectedCountry.cityes);
        }

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Hotel');
        }

        $scope.$on('gmPlacesAutocomplete::placeChanged', function () {
            var location = $scope.autocomplete.getPlace().geometry.location;
            vm.latitude = location.lat();
            vm.longitude = location.lng();
            $scope.$apply();
        });

        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.AddNewHotel = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var newHotel = new Object();
            newHotel.titleDictionary = vm.titleDictionary;
            newHotel.descriptionDictionary = vm.descriptionDictionary;
            newHotel.star = vm.star;
            newHotel.cityId = $scope.selectedCity.cityId;
            newHotel.latitude = vm.latitude;
            newHotel.longitude = vm.longitude;
            newHotel.hotelFeature = vm.selectedfeatures;

            var model = new FormData();
            model.append('data', JSON.stringify(newHotel));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Hotels/',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('Hotel')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    blockUI.stop();
                }
            );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            debugger; var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.newHotelForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
            vm.files.splice(index, 1);
        }

    }
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editHotelDialogController', ['$scope', '$filter','blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
        'CountryPrepService',    'HotelResource', 'ToastService', 'FeaturePrepService', 'HotelByIdPrepService', editHotelDialogController])

    function editHotelDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate,CountryPrepService,
         HotelResource, ToastService,FeaturePrepService, HotelByIdPrepService) {
        blockUI.start("Loading..."); 
        function init(){ 
            $scope.CountryList = []; 
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results) 
            $scope.FeatureList = FeaturePrepService.results;

                       $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
        }
        init();
        $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
            var location = $scope.autocomplete.getPlace().geometry.location;
           vm.Hotel.latitude = location.lat();
           vm.Hotel.longitude = location.lng();
            $scope.$apply();
        });

        var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Hotel = HotelByIdPrepService; 
        vm.RemoveImages = []; 
        vm.CheckImages = []; 
        vm.selectedHotelFeatures=[] ;
        console.log( vm.Hotel);
        vm.CheckImages.push(vm.Hotel.imagesURL);
        var i;
        for (i = 0; i < vm.Hotel.hotelFeature.length; i++) {
            var indexFeature = $scope.FeatureList.indexOf($filter('filter')($scope.FeatureList, { 'featureId': vm.Hotel.hotelFeature[i].featureId }, true)[0]);
            vm.selectedHotelFeatures.push($scope.FeatureList[indexFeature]);

        }


      var indexCountry = $scope.CountryList.indexOf($filter('filter')($scope.CountryList, { 'countryId': vm.Hotel.city.countryId }, true)[0]);
      $scope.selectedCountry=$scope.CountryList[indexCountry];


            $scope.CityList = $scope.selectedCountry.cityes;
  var indexCity = $scope.selectedCountry.cityes.indexOf($filter('filter')($scope.selectedCountry.cityes, { 'cityId': vm.Hotel.city.cityId }, true)[0]);
  $scope.selectedCity=$scope.selectedCountry.cityes[indexCity];  

  $scope.CountryChange = function () {
    for (var i = $scope.CountryList.length - 1; i >= 0; i--) {
        if ($scope.CountryList[i].CountryId == 0) {
            $scope.CountryList.splice(i, 1);
        }
    }
    $scope.CityList = [];
    $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
    $scope.CityList.push($scope.selectedCity);
    $scope.CityList = $scope.CityList.concat($scope.selectedCountry.cityes);
} 

        vm.Close = function () {
            $state.go('Hotel');
        } 
        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.UpdateHotel = function () {
            debugger;
        blockUI.start("Loading..."); 
        vm.isChanged = true;
            var updateObj = new Object();
            updateObj.hotelId = vm.Hotel.hotelId; 
            updateObj.titleDictionary = vm.Hotel.titleDictionary; 
            updateObj.descriptionDictionary = vm.Hotel.descriptionDictionary; 
            updateObj.star = vm.Hotel.star; 
            updateObj.cityId =  $scope.selectedCity.cityId; 
            updateObj.latitude =  vm.Hotel.latitude; 
            updateObj.longitude =  vm.Hotel.longitude; 
            updateObj.removeImages =  vm.RemoveImages; 
            updateObj.hotelFeature = vm.selectedHotelFeatures;

                    var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Hotels/EditHotel',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                                       blockUI.stop();
                     $state.go('Hotel')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        blockUI.stop();
    }
                );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.UpdateHotelForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            vm.CheckImages.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
           vm.RemoveImages.push(index);
            vm.files.splice(index, 1);
            vm.CheckImages.splice(index, 1);
        }

	        vm.removeHotelFile = function (index) { 
            vm.CheckImages.splice(index, 1);
            vm.Hotel.imagesURL.splice(index, 1);
        }}	
}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('HotelReservationController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'HotelReservationResource', 'HotelReservationPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', HotelReservationController]);


    function HotelReservationController($rootScope, blockUI, $scope, $filter, $translate,
        $state, HotelReservationResource, HotelReservationPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[8].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.StatusList = appCONSTANTS.Status;
        $scope.totalCount = HotelReservationPrepService.totalCount;
        $scope.HotelReservationList = HotelReservationPrepService; 
      console.log( $scope.HotelReservationList);
        function refreshHotelReservations() {

            blockUI.start("Loading..."); 

                        var k = HotelReservationResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.HotelReservationList = results  
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
            refreshHotelReservations();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('HotelReservationResource', ['$resource', 'appCONSTANTS', HotelReservationResource]) 

    function HotelReservationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'HotelReservations/', {}, {
            GetAllHotelReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'HotelReservations/GetAllHotelReservations', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'HotelReservations/EditHotelReservation', useToken: true },
            getHotelReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'HotelReservations/GetHotelReservationById/:HotelReservationId', useToken: true }
        })
    } 

}());

(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editHotelReservationDialogController', ['$scope','$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'HotelReservationResource', 'ToastService',
            'HotelReservationByIdPrepService', editHotelReservationDialogController])

    function editHotelReservationDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, HotelReservationResource, ToastService, HotelReservationByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
        $scope.StatusList = appCONSTANTS.Status;
		vm.language = appCONSTANTS.supportedLanguage;
        vm.HotelReservation = HotelReservationByIdPrepService; 
        console.log( vm.HotelReservation);

               var indexStatus = $scope.StatusList.indexOf($filter('filter')($scope.StatusList, { 'id': vm.HotelReservation.status }, true)[0]);
        $scope.selectedStatus=$scope.StatusList[indexStatus];


        vm.Close = function () {
            $state.go('HotelReservation');
        }
        vm.UpdateHotelReservation = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new HotelReservationResource();
            updateObj.hotelReservationId = vm.HotelReservation.hotelReservationId; 
            updateObj.adult = vm.HotelReservation.adult; 
            updateObj.roomCount = vm.HotelReservation.roomCount; 
            updateObj.child = vm.HotelReservation.child; 
            updateObj.status = $scope.selectedStatus.id; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('HotelReservation');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('InqueryController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'ContactFormResource', 'InqueryPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', InqueryController])





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
(function () {

        angular
      .module('home')
        .factory('ContactFormResource', ['$resource', 'appCONSTANTS', ContactFormResource]) 

    function ContactFormResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'ContactForms/', {}, {
            getAllInquerys: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactForms/GetAllContactForms', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'ContactForms/EditContactForm', useToken: true },
            getContactForm: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactForms/GetContactFormById/:ContactFormId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createCareerFormDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CareerFormResource', 'ToastService', '$rootScope', createCareerFormDialogController])

    function createCareerFormDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CareerFormResource,
        ToastService, $rootScope) {

                blockUI.start("Loading..."); 

            		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('CareerForm');
		} 

		 		vm.AddNewCareerForm = function () {
            blockUI.start("Loading..."); 
            debugger;
            var newObj = new CareerFormResource();

                 newObj.title = vm.title; 
            newObj.description= vm.description; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('CareerForm');
                     blockUI.stop();        


                },
                function (data, status) {
               blockUI.stop();        

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

  	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editInqueryDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
         'ContactFormResource', 'ToastService',            'InqueryByIdPrepService', editInqueryDialogController])

    function editInqueryDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, 
        ContactFormResource, ToastService, InqueryByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Inquery = InqueryByIdPrepService; 
        console.log( vm.Inquery)
        vm.Close = function () {
            $state.go('Inquery');
        }
        vm.UpdateInquery = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new ContactFormResource();

                        updateObj.title = vm.Inquery.title; 
            updateObj.description= vm.Inquery.description; 
            updateObj.InqueryId = vm.Inquery.InqueryId; 
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Inquery');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
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
        $($('.pmd-sidebar-nav').children()[14].children[0]).addClass("active")

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
(function () {
    angular
      .module('home')
        .factory('NewsResource', ['$resource', 'appCONSTANTS', NewsResource]) 

    function NewsResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'News/', {}, {
            getAllNews: { method: 'GET', url: appCONSTANTS.API_URL + 'News/GetAllNews', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'News/EditNews', useToken: true },
            getNews: { method: 'GET', url: appCONSTANTS.API_URL + 'News/GetNewsById/:NewsId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createNewsDialogController', ['$scope','$filter',  'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'NewsResource', 'ToastService', '$rootScope', createNewsDialogController])

    function createNewsDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, NewsResource,
        ToastService, $rootScope) {

                blockUI.start("Loading..."); 

            		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('News');
		} 





        blockUI.stop();



                       vm.AddNewNews = function(){
			vm.isChanged = true;
            var newNews = new Object();  
            newNews.titleDictionary = vm.titleDictionary; 
            newNews.descriptionDictionary = vm.descriptionDictionary; 


                                var model = new FormData();
            model.append('data', JSON.stringify(newNews));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
				method: 'POST',
				url: appCONSTANTS.API_URL + 'News/',
				useToken: true,
				headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('NewsAddSuccess'),"success"); 
					 $state.go('News');
					 vm.isChanged = false;
				},
				function(data, status) {
					vm.isChanged = false;
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				}
            ); 
        }

                vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }

                vm.files = [];
        $scope.AddFile = function (element) {
          debugger;  var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.newNewsForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
            vm.files.splice(index, 1);
        }
	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editNewsDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'NewsResource', 'ToastService',
            'NewsByIdPrepService', editNewsDialogController])

    function editNewsDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, NewsResource, ToastService, NewsByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.News = NewsByIdPrepService; 
        vm.RemoveImages = []; 
        vm.CheckImages = []; 
          console.log(vm.News);
        vm.Close = function () {
            $state.go('News');
        }



                                          vm.UpdateNews = function () {
                debugger;
            blockUI.start("Loading..."); 
            vm.isChanged = true;
                var updateObj = new Object();
                updateObj.newsId = vm.News.newsId;
                updateObj.titleDictionary = vm.News.titleDictionary;
                updateObj.descriptionDictionary = vm.News.descriptionDictionary;  

                            var model = new FormData();
                model.append('data', JSON.stringify(updateObj));
                vm.files.forEach(function (element) {
                    model.append('file', element);
                }, this);

                    $http({
                    method: 'POST',
                    url: appCONSTANTS.API_URL + 'News/EditNews',
                    useToken: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity,
                    data: model
                }).then(
                    function (data, status) {
                        vm.isChanged = false;
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                                               blockUI.stop();
                         $state.go('News')

                        },
                    function (data, status) {
                        vm.isChanged = false;
                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
            blockUI.stop();
        }
                    );
            }
        blockUI.stop();


                    vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
          vm.files = [];
        $scope.AddFile = function (element) {
            var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.UpdateNewsForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            vm.CheckImages.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
           vm.RemoveImages.push(index);
            vm.files.splice(index, 1);
            vm.CheckImages.splice(index, 1);
        }

	        vm.removeNewsFile = function (index) { 
            vm.CheckImages.splice(index, 1);
            vm.News.imagesURL.splice(index, 1);
        }}	

	 	}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('OfferController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'OfferResource', 'OfferPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', OfferController]);


    function OfferController($rootScope, blockUI, $scope, $filter, $translate,
        $state, OfferResource, OfferPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[12].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = OfferPrepService.totalCount;
        $scope.OfferList = OfferPrepService;
        console.log($scope.OfferList);
        function refreshOffers() {

            blockUI.start("Loading...");

            var k = OfferResource.GetAllOffers({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.OfferList = results
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
            refreshOffers();
        }
        blockUI.stop();

    }

})();
(function () {
    angular
      .module('home')
        .factory('OfferResource', ['$resource', 'appCONSTANTS', OfferResource]) 

    function OfferResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Offers/', {}, {
            GetAllOffers: { method: 'GET', url: appCONSTANTS.API_URL + 'Offers/GetAllOffers', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Offers/EditOffer', useToken: true },
            getOffer: { method: 'GET', url: appCONSTANTS.API_URL + 'Offers/GetOfferById/:OfferId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createOfferDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService', 'HotelPrepService', 'TypePrepService', 'OfferResource', 'ToastService', '$rootScope', createOfferDialogController])

    function createOfferDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        HotelPrepService, TypePrepService, OfferResource, ToastService, $rootScope) {

        blockUI.start("Loading...");
        function init() {
            $scope.selectedCountry = { CountryId: 0, titleDictionary: { "en": "Select Country", "ar": "اختار منطقه" } };
            $scope.CountryList = [];
            $scope.CountryList.push($scope.selectedCountry);
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results)

            $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
            $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
            debugger;
            $scope.HotelList = HotelPrepService.results;
            $scope.TypeList = TypePrepService.results;
        }
        init();

        $scope.CountryChange = function () {
            for (var i = $scope.CountryList.length - 1; i >= 0; i--) {
                if ($scope.CountryList[i].CountryId == 0) {
                    $scope.CountryList.splice(i, 1);
                }
            }
            $scope.CityList = [];
            $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
            $scope.CityList.push($scope.selectedCity);
            $scope.CityList = $scope.CityList.concat($scope.selectedCountry.cityes);
        }

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Offer');
        }



        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.AddNewOffer = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var newOffer = new Object();
            newOffer.titleDictionary = vm.titleDictionary;
            newOffer.descriptionDictionary = vm.descriptionDictionary;
            newOffer.star = vm.star;
            newOffer.cityId = $scope.selectedCity.cityId;
            newOffer.daysCount = vm.daysCount;
            newOffer.nigthsCount = vm.nigthsCount;
            newOffer.priceBefore = vm.priceBefore;
            newOffer.price = vm.price;
            newOffer.hotelId = vm.selectedHotel.hotelId;
            newOffer.typeId = vm.selectedType.typeId;

            var model = new FormData();
            model.append('data', JSON.stringify(newOffer));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Offers/',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('Offer')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    blockUI.stop();
                }
                );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            debugger; var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.newOfferForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
            vm.files.splice(index, 1);
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editOfferDialogController', ['$scope', '$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService', 'OfferResource', 'ToastService', 'HotelPrepService','TypePrepService', 'OfferByIdPrepService', editOfferDialogController])

    function editOfferDialogController($scope, $filter, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        OfferResource, ToastService, HotelPrepService,TypePrepService, OfferByIdPrepService) {
        blockUI.start("Loading...");
        function init() {
            $scope.CountryList = [];
            $scope.CountryList = $scope.CountryList.concat(CountryPrepService.results)
            $scope.HotelList = HotelPrepService.results;
            $scope.TypeList = TypePrepService.results;

            $scope.CityList = [];
            $scope.CityList.push($scope.selectedCity);
        }
        init(); 

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Offer = OfferByIdPrepService;
        vm.RemoveImages = [];
        vm.CheckImages = [];
        vm.selectedHotel = [];
        console.log(vm.Offer);
        vm.CheckImages.push(vm.Offer.imagesURL);


        var indexHotel = $scope.HotelList.indexOf($filter('filter')($scope.HotelList, { 'hotelId': vm.Offer.hotel.hotelId }, true)[0]);
        $scope.selectedHotel = $scope.HotelList[indexHotel];

        var indexType = $scope.TypeList.indexOf($filter('filter')($scope.TypeList, { 'typeId': vm.Offer.type.typeId }, true)[0]);
        $scope.selectedType = $scope.TypeList[indexType];

        var indexCountry = $scope.CountryList.indexOf($filter('filter')($scope.CountryList, { 'countryId': vm.Offer.city.countryId }, true)[0]);
        $scope.selectedCountry = $scope.CountryList[indexCountry];


        $scope.CityList = $scope.selectedCountry.cityes;
        var indexCity = $scope.selectedCountry.cityes.indexOf($filter('filter')($scope.selectedCountry.cityes, { 'cityId': vm.Offer.city.cityId }, true)[0]);
        $scope.selectedCity = $scope.selectedCountry.cityes[indexCity];

        $scope.CountryChange = function () {
            for (var i = $scope.CountryList.length - 1; i >= 0; i--) {
                if ($scope.CountryList[i].CountryId == 0) {
                    $scope.CountryList.splice(i, 1);
                }
            }
            $scope.CityList = [];
            $scope.selectedCity = { CityId: 0, titleDictionary: { "en": "Select City", "ar": "اختار فرع" } };
            $scope.CityList.push($scope.selectedCity);
            $scope.CityList = $scope.CityList.concat($scope.selectedCountry.cityes);
        }

        vm.Close = function () {
            $state.go('Offer');
        }
        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.UpdateOffer = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var updateObj = new Object();
            updateObj.offerId = vm.Offer.offerId;
            updateObj.titleDictionary = vm.Offer.titleDictionary;
            updateObj.descriptionDictionary = vm.Offer.descriptionDictionary;
            updateObj.star = vm.Offer.star;
            updateObj.cityId = $scope.selectedCity.cityId; 
            updateObj.removeImages = vm.RemoveImages; 
            updateObj.daysCount = vm.Offer.daysCount;
            updateObj.nigthsCount = vm.Offer.nigthsCount;
            updateObj.priceBefore = vm.Offer.priceBefore;
            updateObj.price = vm.Offer.price;
            updateObj.hotelId = $scope.selectedHotel.hotelId;
            updateObj.typeId = $scope.selectedType.typeId;


            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Offers/EditOffer',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('Offer')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    blockUI.stop();
                }
                );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.UpdateOfferForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            vm.CheckImages.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
            vm.RemoveImages.push(index);
            vm.files.splice(index, 1);
            vm.CheckImages.splice(index, 1);
        }

        vm.removeOfferFile = function (index) {
            vm.CheckImages.splice(index, 1);
            vm.Offer.imagesURL.splice(index, 1);
        }
    }
}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('OfferReservationController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'OfferReservationResource', 'OfferReservationPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', OfferReservationController]);


    function OfferReservationController($rootScope, blockUI, $scope, $filter, $translate,
        $state, OfferReservationResource, OfferReservationPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.StatusList = appCONSTANTS.Status;
        $scope.totalCount = OfferReservationPrepService.totalCount;
        $scope.OfferReservationList = OfferReservationPrepService; 
      console.log( $scope.OfferReservationList);
        function refreshOfferReservations() {

            blockUI.start("Loading..."); 

                        var k = OfferReservationResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.OfferReservationList = results  
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
            refreshOfferReservations();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('OfferReservationResource', ['$resource', 'appCONSTANTS', OfferReservationResource]) 

    function OfferReservationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'OfferReservations/', {}, {
            GetAllOfferReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'OfferReservations/GetAllOfferReservations', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'OfferReservations/EditOfferReservation', useToken: true },
            getOfferReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'OfferReservations/GetOfferReservationById/:OfferReservationId', useToken: true }
        })
    } 

}());

(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editOfferReservationDialogController', ['$scope','$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'OfferReservationResource', 'ToastService',
            'OfferReservationByIdPrepService', editOfferReservationDialogController])

    function editOfferReservationDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, OfferReservationResource, ToastService, OfferReservationByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
        $scope.StatusList = appCONSTANTS.Status;
		vm.language = appCONSTANTS.supportedLanguage;
        vm.OfferReservation = OfferReservationByIdPrepService; 
        console.log( vm.OfferReservation);

               var indexStatus = $scope.StatusList.indexOf($filter('filter')($scope.StatusList, { 'id': vm.OfferReservation.status }, true)[0]);
        $scope.selectedStatus=$scope.StatusList[indexStatus];


        vm.Close = function () {
            $state.go('OfferReservation');
        }
        vm.UpdateOfferReservation = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new OfferReservationResource();
            updateObj.offerReservationId = vm.OfferReservation.offerReservationId; 
            updateObj.adult = vm.OfferReservation.adult; 
            updateObj.roomCount = vm.OfferReservation.roomCount; 
            updateObj.child = vm.OfferReservation.child; 
            updateObj.status = $scope.selectedStatus.id; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('OfferReservation');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('OwnerController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'OwnerResource', 'OwnerPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', OwnerController]);


    function OwnerController($rootScope, blockUI, $scope, $filter, $translate,
        $state, OwnerResource, OwnerPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.totalCount = OwnerPrepService.totalCount;
        $scope.OwnerList = OwnerPrepService;
        function refreshOwners() {

            blockUI.start("Loading..."); 

                        var k = OwnerResource.getAllOwners({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.OwnerList = results  
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
            refreshOwners();
        }
        blockUI.stop();

            }

})();
(function () {

        angular
      .module('home')
        .factory('OwnerResource', ['$resource', 'appCONSTANTS', OwnerResource]) 

    function OwnerResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Owners/', {}, {
            getAllOwners: { method: 'GET', url: appCONSTANTS.API_URL + 'Owners/GetAllOwners', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Owners/EditOwner', useToken: true },
            getOwner: { method: 'GET', url: appCONSTANTS.API_URL + 'Owners/GetOwnerById/:OwnerId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createOwnerDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'OwnerResource', 'ToastService', '$rootScope', createOwnerDialogController])

    function createOwnerDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, OwnerResource,
        ToastService, $rootScope) {

                blockUI.start("Loading..."); 

            		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Owner');
		} 

		 		vm.AddNewOwner = function () {
            blockUI.start("Loading..."); 

                        var newObj = new OwnerResource();
            newObj.titleDictionary = vm.titleDictionary; 
            newObj.postionDictionary = vm.postionDictionary; 
            newObj.descriptionDictionary = vm.descriptionDictionary; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Owner');
                     blockUI.stop();        


                },
                function (data, status) {
               blockUI.stop();        

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

  	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editOwnerDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'OwnerResource', 'ToastService',
            'OwnerByIdPrepService', editOwnerDialogController])

    function editOwnerDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, OwnerResource, ToastService, OwnerByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Owner = OwnerByIdPrepService; 
        console.log( vm.Owner);
        vm.Close = function () {
            $state.go('Owner');
        }
        vm.UpdateOwner = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new OwnerResource();
            updateObj.ownerId = vm.Owner.ownerId;
            updateObj.titleDictionary = vm.Owner.titleDictionary;
            updateObj.postionDictionary = vm.Owner.postionDictionary; 
            updateObj.descriptionDictionary = vm.Owner.descriptionDictionary;  
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Owner');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('TourController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'TourResource', 'TourPrepService', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', TourController]);


    function TourController($rootScope, blockUI, $scope, $filter, $translate,
        $state, TourResource, TourPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = TourPrepService.totalCount;
        $scope.TourList = TourPrepService;
        console.log($scope.TourList);
        function refreshTours() {

            blockUI.start("Loading...");

            var k = TourResource.GetAllTours({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.TourList = results
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
            refreshTours();
        }
        blockUI.stop();

    }

})();
(function () {
    angular
      .module('home')
        .factory('TourResource', ['$resource', 'appCONSTANTS', TourResource]) 

    function TourResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Tours/', {}, {
            GetAllTours: { method: 'GET', url: appCONSTANTS.API_URL + 'Tours/GetAllTours', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Tours/EditTour', useToken: true },
            getTour: { method: 'GET', url: appCONSTANTS.API_URL + 'Tours/GetTourById/:TourId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createTourDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService', 'FeaturePrepService', 'TourResource', 'ToastService', '$rootScope', createTourDialogController])

    function createTourDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        FeaturePrepService, TourResource, ToastService, $rootScope) {

        blockUI.start("Loading..."); 

             var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Tour');
        }


         blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }
        vm.AddNewTour = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var newTour = new Object();
            newTour.titleDictionary = vm.titleDictionary;
            newTour.descriptionDictionary = vm.descriptionDictionary; 
            newTour.mekkaDays = vm.mekkaDays; 
            newTour.madinaDays = vm.madinaDays; 
            newTour.duration = vm.duration; 
            newTour.price = vm.price; 
            newTour.startFrom =$('#startFrom').val();
            newTour.startTo = $('#startTo').val();
            newTour.hotelTitle = vm.hotelTitle;

            var model = new FormData();
            model.append('data', JSON.stringify(newTour));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Tours/',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('Tour')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    blockUI.stop();
                }
            );
        }
        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#startFrom').data('date') == null || $('#startFrom').data('date') == "" ||
            $('#startTo').data('date') == null || $('#startTo').data('date') == "") {
                $scope.dateIsValid = false;
            } else if ($scope.newTourForm.$valid) {
                $scope.dateIsValid = true;
            }
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            debugger; var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.newTourForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
            vm.files.splice(index, 1);
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editTourDialogController', ['$scope', '$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CountryPrepService', 'TourResource', 'ToastService', 'TourByIdPrepService', editTourDialogController])

    function editTourDialogController($scope, $filter, blockUI, $http, $state, appCONSTANTS, $translate, CountryPrepService,
        TourResource, ToastService, TourByIdPrepService) {
        blockUI.start("Loading...");


        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Tour = TourByIdPrepService;
        vm.RemoveImages = [];
        vm.CheckImages = [];

        vm.Tour.startFrom = vm.Tour.startFrom + "Z";
        vm.Tour.startFrom = $filter('date')(new Date(vm.Tour.startFrom), "MM/dd/yyyy hh:mm a");

        console.log(vm.Tour);

        vm.Close = function () {
            $state.go('Tour');
        }
        blockUI.stop();
        vm.isChanged = false;

        vm.LoadUploadImages = function () {
            $("#file").click();
            vm.fileExist = false;

        }

        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#startFrom').data('date') == null || $('#startFrom').data('date') == "" ||
                $('#startTo').data('date') == null || $('#startTo').data('date') == "") {
                $scope.dateIsValid = false;
            } else if ($scope.UpdateTourForm.$valid) {
                $scope.dateIsValid = true;
            }
        }
        vm.UpdateTour = function () {
            debugger;
            blockUI.start("Loading...");
            vm.isChanged = true;
            var updateObj = new Object();
            updateObj.tourId = vm.Tour.tourId;
            updateObj.titleDictionary = vm.Tour.titleDictionary;
            updateObj.descriptionDictionary = vm.Tour.descriptionDictionary;
            updateObj.star = vm.Tour.star;
            updateObj.mekkaDays = vm.Tour.mekkaDays; 
            updateObj.madinaDays = vm.Tour.madinaDays; 
            updateObj.duration = vm.Tour.duration; 
            updateObj.price = vm.Tour.price; 
            updateObj.startFrom =$('#startFrom').val();
            updateObj.startTo = $('#startTo').val();
            updateObj.hotelTitle = vm.Tour.hotelTitle;


            var model = new FormData();
            model.append('data', JSON.stringify(updateObj));
            vm.files.forEach(function (element) {
                model.append('file', element);
            }, this);

            $http({
                method: 'POST',
                url: appCONSTANTS.API_URL + 'Tours/EditTour',
                useToken: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                data: model
            }).then(
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    blockUI.stop();
                    $state.go('Tour')

                },
                function (data, status) {
                    vm.isChanged = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    blockUI.stop();
                }
            );
        }
        vm.files = [];
        $scope.AddFile = function (element) {
            var imageFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            vm.files.forEach(function (file) {
                if (file.name === imageFile.name) {
                    vm.fileExist = true;
                    ToastService.show("right", "bottom", "fadeInUp", "File is already exist", "error");
                    return
                }
            }, this);
            if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
                    if (!vm.fileExist) {
                        $scope.UpdateTourForm.$dirty = true;
                        $scope.$apply(function () {

                            vm.files.push(imageFile);
                            vm.CheckImages.push(imageFile);
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                $scope.$apply();
                            };
                            if (imageFile) {
                                reader.readAsDataURL(imageFile);
                            }
                        })
                    }
                    else {
                        $("#file").val('');
                        $scope.$apply()
                    }
                } else {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (imageFile) {
                    $("#file").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }

        vm.removeFile = function (index) {
            vm.RemoveImages.push(index);
            vm.files.splice(index, 1);
            vm.CheckImages.splice(index, 1);
        }

        vm.removeTourFile = function (index) {
            vm.CheckImages.splice(index, 1);
            vm.Tour.imagesURL.splice(index, 1);
        }
    }
}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('TourReservationController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'TourReservationResource', 'TourReservationPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', TourReservationController]);


    function TourReservationController($rootScope, blockUI, $scope, $filter, $translate,
        $state, TourReservationResource, TourReservationPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService) { 

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.StatusList = appCONSTANTS.Status;
        $scope.totalCount = TourReservationPrepService.totalCount;
        $scope.TourReservationList = TourReservationPrepService; 
      console.log( $scope.TourReservationList);
        function refreshTourReservations() {

            blockUI.start("Loading..."); 

                        var k = TourReservationResource.GetAllCountries({page:vm.currentPage}).$promise.then(function (results) { 
                $scope.TourReservationList = results  
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
            refreshTourReservations();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('TourReservationResource', ['$resource', 'appCONSTANTS', TourReservationResource]) 

    function TourReservationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'TourReservations/', {}, {
            GetAllTourReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'TourReservations/GetAllTourReservations', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'TourReservations/EditTourReservation', useToken: true },
            getTourReservation: { method: 'GET', url: appCONSTANTS.API_URL + 'TourReservations/GetTourReservationById/:TourReservationId', useToken: true }
        })
    } 

}());

(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editTourReservationDialogController', ['$scope','$filter', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'TourReservationResource', 'ToastService',
            'TourReservationByIdPrepService', editTourReservationDialogController])

    function editTourReservationDialogController($scope,$filter, blockUI, $http, $state, appCONSTANTS, $translate, TourReservationResource, ToastService, TourReservationByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
        $scope.StatusList = appCONSTANTS.Status;
		vm.language = appCONSTANTS.supportedLanguage;
        vm.TourReservation = TourReservationByIdPrepService; 
        console.log( vm.TourReservation);

               var indexStatus = $scope.StatusList.indexOf($filter('filter')($scope.StatusList, { 'id': vm.TourReservation.status }, true)[0]);
        $scope.selectedStatus=$scope.StatusList[indexStatus];


        vm.Close = function () {
            $state.go('TourReservation');
        }
        vm.UpdateTourReservation = function () { 
            blockUI.start("Loading..."); 
            debugger;
            var updateObj = new TourReservationResource();
            updateObj.TourReservationId = vm.TourReservation.TourReservationId; 
            updateObj.adult = vm.TourReservation.adult; 
            updateObj.roomCount = vm.TourReservation.roomCount; 
            updateObj.child = vm.TourReservation.child; 
            updateObj.status = $scope.selectedStatus.id; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('TourReservation');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
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
(function () {
    angular
      .module('home')
        .factory('TypeResource', ['$resource', 'appCONSTANTS', TypeResource]) 

    function TypeResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Types/', {}, {
            getAllTypes: { method: 'GET', url: appCONSTANTS.API_URL + 'Types/GetAllTypes', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Types/EditType', useToken: true },
            getType: { method: 'GET', url: appCONSTANTS.API_URL + 'Types/GetTypeById/:TypeId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createTypeDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'TypeResource', 'ToastService', '$rootScope', createTypeDialogController])

    function createTypeDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, TypeResource,
        ToastService, $rootScope) {

                blockUI.start("Loading..."); 

            		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Type');
		} 

		 		vm.AddNewType = function () {
            blockUI.start("Loading..."); 

                        var newObj = new TypeResource();
            newObj.titleDictionary = vm.titleDictionary; 
            newObj.IsDeleted = false;  
            newObj.$create().then(
                function (data, status) { 
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Type');
                     blockUI.stop();        


                },
                function (data, status) {
               blockUI.stop();        

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

  	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editTypeDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'TypeResource', 'ToastService',
            'TypeByIdPrepService', editTypeDialogController])

    function editTypeDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, TypeResource, ToastService, TypeByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Type = TypeByIdPrepService; 
        vm.Close = function () {
            $state.go('Type');
        }
        vm.UpdateType = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new TypeResource();
            updateObj.typeId = vm.Type.typeId;
            updateObj.titleDictionary = vm.Type.titleDictionary;
		    updateObj.IsDeleted = false; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Type');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')


            .controller('editUserController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate', '$state', 'UserResource',  
            'userPrepService',  'EditUserPrepService', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', editUserController]);

    function editUserController($rootScope, blockUI, $scope, $filter, $translate, $state, UserResource,    userPrepService, EditUserPrepService,
          $localStorage, authorizationService, appCONSTANTS, ToastService) {

        blockUI.start("Loading...");

        $scope.isPaneShown = true;
        $scope.$emit('LOAD')
        var vm = this;


                 vm.show = true;  
        $scope.userObj = EditUserPrepService;
        $scope.userObj.confirmPassword = $scope.userObj.password;
        $scope.userTypeList = appCONSTANTS.UserType;

         $scope.selectedType = "";
        console.log($scope.userObj);

               var indexType = $scope.userTypeList.indexOf($filter('filter')($scope.userTypeList, { 'id': $scope.userObj.userType }, true)[0]);
        $scope.selectedType=$scope.userTypeList[indexType]; 




               $scope.Updateclient = function () {
            blockUI.start("Loading..."); 
            var updateClient = new UserResource();
            updateClient.UserId = $scope.userObj.userId;
            updateClient.Fullname = $scope.userObj.fullName; 
            updateClient.Title = $scope.userObj.title; 
            updateClient.Phone = $scope.userObj.phone;
            updateClient.WhatsApp = $scope.userObj.whatsApp;
            updateClient.Email = $scope.userObj.email;
            updateClient.Password = $scope.userObj.password;
            updateClient.IsDeleted = false; 
            updateClient.UserType = $scope.selectedType.id; 
            updateClient.$update().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    $state.go('users');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();


    }

})();(function () {
    'use strict';

    angular
        .module('home')
        .controller('userController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate', '$state', 'UserResource',  
            'userPrepService',   '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', userController]);

    function userController($rootScope, blockUI, $scope, $filter, $translate, $state, UserResource,    userPrepService, 
          $localStorage, authorizationService, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[15].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = userPrepService.totalCount;
        $scope.userList = userPrepService.results; 
        console.log($scope.userList);

        $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
        $scope.userObj = "";
        $scope.selectedType = ""; 
        $scope.userTypeList = appCONSTANTS.UserType;

               function refreshUsers() {
            blockUI.start("Loading...");

            var k = UserResource.getAllUsers({ page: vm.currentPage }).$promise.then(function (results) {
                vm.getPageData = results;
                $scope.userList = vm.getPageData.results;
                console.log($scope.userList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }



               $scope.AddNewclient = function () {
            blockUI.start("Loading...");

            var newClient = new UserResource(); 
            newClient.Fullname = $scope.fullName; 
            newClient.Title = $scope.title; 
            newClient.Phone = $scope.Phone;
            newClient.WhatsApp = $scope.whatsApp;
            newClient.Email = $scope.Email;
            newClient.Password = $scope.Password;
            newClient.UserType = $scope.selectedType;
            newClient.IsDeleted = false;
            newClient.IsSystemUser = true;

            newClient.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");

                    localStorage.setItem('data', JSON.stringify(data.userId));
                    $state.go('users');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }

        blockUI.stop();

    }

}());(function () {
    angular
        .module('home')
        .factory('UserResource', ['$resource', 'appCONSTANTS', UserResource])

    function UserResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Users/', {}, {
            getAllUsers: { method: 'GET', url: appCONSTANTS.API_URL + 'Users/GetAllSystemUsers', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Users/EditRegisterUser', useToken: true },
            getUser: { method: 'GET', url: appCONSTANTS.API_URL + 'Users/GetUserById/:UserId', useToken: true }, 
        })
    }

}());
