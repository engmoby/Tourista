﻿using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.Practices.Unity;
using Tourista.BLL.DataServices;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.FormToMail;
using Tourista.Common;
using Tourista.DAL;
using Tourista.DAL.Entities.Model;
using System.Linq;
using System.Threading;
using Windows.ApplicationModel.Contacts;
using Tourista.BLL.Services.ManageStorage;

namespace Tourista.BLL
{
    public static class TouristaBllConfig
    {
        public static void RegisterMappings(MapperConfigurationExpression mapperConfiguration)
        {
            mapperConfiguration.CreateMap<User, UserDto>()
                .ForMember(dto => dto.Password, m => m.MapFrom(src => PasswordHelper.Decrypt(src.Password)));
            mapperConfiguration.CreateMap<UserDto, User>();

            mapperConfiguration.CreateMap<Career, CareerDto>();
            mapperConfiguration.CreateMap<CareerDto, Career>();


            mapperConfiguration.CreateMap<CareerForm, CareerFormDto>();
            mapperConfiguration.CreateMap<CareerFormDto, CareerForm>();

            mapperConfiguration.CreateMap<CountryDto, Country>()
                .ForMember(dto => dto.Cityes, m => m.Ignore());
            mapperConfiguration.CreateMap<Country, CountryDto>()
                .ForMember(dto => dto.TitleDictionary, m => m.MapFrom(src => src.CountryTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Title)));

            mapperConfiguration.CreateMap<CityDto, City>();
            mapperConfiguration.CreateMap<City, CityDto>()
                .ForMember(dto => dto.TitleDictionary, m => m.MapFrom(src => src.CityTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Title)));


            mapperConfiguration.CreateMap<CurrencyDto, Currency>();
            mapperConfiguration.CreateMap<Currency, CurrencyDto>()
                .ForMember(dto => dto.TitleDictionary, m => m.MapFrom(src => src.CurrencyTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Title)));

            mapperConfiguration.CreateMap<OwnerDto, Owner>();
            mapperConfiguration.CreateMap<Owner, OwnerDto>()
                .ForMember(dto => dto.TitleDictionary, m => m.MapFrom(src => src.OwnerTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Title)))
                .ForMember(dto => dto.DescriptionDictionary, m => m.MapFrom(src => src.OwnerTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Description)))
                .ForMember(dto => dto.PostionDictionary, m => m.MapFrom(src => src.OwnerTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Postion)));


            mapperConfiguration.CreateMap<NewsDto, News>();
            mapperConfiguration.CreateMap<News, NewsDto>()
                .ForMember(dto => dto.TitleDictionary, m => m.MapFrom(src => src.NewsTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Title)))
                .ForMember(dto => dto.DescriptionDictionary, m => m.MapFrom(src => src.NewsTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Description)));

            mapperConfiguration.CreateMap<FeatureDto, Feature>();
            mapperConfiguration.CreateMap<Feature, FeatureDto>()
                .ForMember(dto => dto.TitleDictionary, m => m.MapFrom(src => src.FeaturesTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Title)));



            mapperConfiguration.CreateMap<HotelFeatureDto, HotelFeature>();
            mapperConfiguration.CreateMap<HotelFeature, HotelFeatureDto>();

            mapperConfiguration.CreateMap<HotelDto, Hotel>();
            mapperConfiguration.CreateMap<Hotel, HotelDto>()
                .ForMember(dto => dto.TitleDictionary,
                    m => m.MapFrom(src => src.HotelTranslations.ToDictionary(
                        translation => translation.Language.ToLower(), translation => translation.Title)))
                .ForMember(dto => dto.DescriptionDictionary,
                    m => m.MapFrom(src => src.HotelTranslations.ToDictionary(
                        translation => translation.Language.ToLower(), translation => translation.Description)));
            // .ForMember(dto => dto.City, m => m.MapFrom(src => src.CityId));


            mapperConfiguration.CreateMap<HotelReservationDto, HotelReservation>();
            mapperConfiguration.CreateMap<HotelReservation, HotelReservationDto>() 
            ;

            mapperConfiguration.CreateMap<BackageDto, Backage>();
            mapperConfiguration.CreateMap<Backage, BackageDto>()
                .ForMember(dto => dto.TitleDictionary,
                    m => m.MapFrom(src => src.BackageTranslations.ToDictionary(
                        translation => translation.Language.ToLower(), translation => translation.Title)))
                .ForMember(dto => dto.DescriptionDictionary,
                    m => m.MapFrom(src => src.BackageTranslations.ToDictionary(
                        translation => translation.Language.ToLower(), translation => translation.Description)));


            mapperConfiguration.CreateMap<BackageReservationDto, BackageReservation>();
            mapperConfiguration.CreateMap<BackageReservation, BackageReservationDto>();

            mapperConfiguration.CreateMap<OfferDto, Offer>();
            mapperConfiguration.CreateMap<Offer, OfferDto>()
                .ForMember(dto => dto.TitleDictionary,
                    m => m.MapFrom(src => src.OfferTranslations.ToDictionary(
                        translation => translation.Language.ToLower(), translation => translation.Title)))
                .ForMember(dto => dto.DescriptionDictionary,
                    m => m.MapFrom(src => src.OfferTranslations.ToDictionary(
                        translation => translation.Language.ToLower(), translation => translation.Description)));
            //.ForMember(dto => dto.City, m => m.MapFrom(src => src.CityId));


            mapperConfiguration.CreateMap<OfferReservationDto, OfferReservation>();
            mapperConfiguration.CreateMap<OfferReservation, OfferReservationDto>();

            mapperConfiguration.CreateMap<TourDto, Tour>();
            mapperConfiguration.CreateMap<Tour, TourDto>()
                .ForMember(dto => dto.TitleDictionary,
                    m => m.MapFrom(src => src.TourTranslations.ToDictionary(
                        translation => translation.Language.ToLower(), translation => translation.Title)))
                .ForMember(dto => dto.DescriptionDictionary,
                    m => m.MapFrom(src => src.TourTranslations.ToDictionary(
                        translation => translation.Language.ToLower(), translation => translation.Description)));


            mapperConfiguration.CreateMap<TourReservationDto, TourReservation>();
            mapperConfiguration.CreateMap<TourReservation, TourReservationDto>();


            mapperConfiguration.CreateMap<TypeDto, Type>();
            mapperConfiguration.CreateMap<Type, TypeDto>()
                .ForMember(dto => dto.TitleDictionary, m => m.MapFrom(src => src.TypeTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Title)));


            mapperConfiguration.CreateMap<AboutDto, About>();
            mapperConfiguration.CreateMap<About, AboutDto>()
                .ForMember(dto => dto.DescriptionDictionary, m => m.MapFrom(src => src.AboutTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Description)));



            mapperConfiguration.CreateMap<ContactDto, ContactUs>();
            mapperConfiguration.CreateMap<ContactUs, ContactDto>()
                .ForMember(dto => dto.AddressDictionary, m => m.MapFrom(src => src.ContactUsTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Address)));


            mapperConfiguration.CreateMap<ContactDto, ContactUs>();
            mapperConfiguration.CreateMap<ContactUs, ContactDto>()
                .ForMember(dto => dto.AddressDictionary, m => m.MapFrom(src => src.ContactUsTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.Address)));


            mapperConfiguration.CreateMap<NewsLetterDto, NewsLetter>();
            mapperConfiguration.CreateMap<NewsLetter, NewsLetterDto>();

            mapperConfiguration.CreateMap<ContactFormDto, Inquery>();
            mapperConfiguration.CreateMap<Inquery, ContactFormDto>();
             

            Mapper.Initialize(mapperConfiguration);
        }

        public static void RegisterTypes(IUnityContainer container)
        {
            TouristaDalConfig.RegisterTypes(container);
            container
                .RegisterType<IHotelService, HotelService>(new PerResolveLifetimeManager())
                .RegisterType<IHotelTranslationService, HotelTranslationService>(new PerResolveLifetimeManager())

                  .RegisterType<IHotelService, HotelService>(new PerResolveLifetimeManager())
                .RegisterType<IHotelTranslationService, HotelTranslationService>(new PerResolveLifetimeManager())

                  .RegisterType<IBackageService, BackageService>(new PerResolveLifetimeManager())
                .RegisterType<IBackageTranslationService, BackageTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<IBackageReservationService, BackageReservationService>(new PerResolveLifetimeManager())

                     .RegisterType<IOfferService, OfferService>(new PerResolveLifetimeManager())
                   .RegisterType<IOfferTranslationService, OfferTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<IOfferReservationService, OfferReservationService>(new PerResolveLifetimeManager())
              
                  .RegisterType<ITypeService, TypeService>(new PerResolveLifetimeManager())
                .RegisterType<ITypeTranslationService, TypeTranslationService>(new PerResolveLifetimeManager())

                .RegisterType<ITourService, TourService>(new PerResolveLifetimeManager())
                .RegisterType<ITourTranslationService, TourTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<ITourReservationService, TourReservationService>(new PerResolveLifetimeManager())

                .RegisterType<ICountryService, CountryService>(new PerResolveLifetimeManager())
                .RegisterType<ICountryTranslationService, CountryTranslationService>(new PerResolveLifetimeManager())

                .RegisterType<ICityService, CityService>(new PerResolveLifetimeManager())
                .RegisterType<ICityTranslationService, CityTranslationService>(new PerResolveLifetimeManager())

                .RegisterType<ICurrencyService, CurrencyService>(new PerResolveLifetimeManager())
                .RegisterType<ICurrencyTranslationService, CurrencyTranslationService>(new PerResolveLifetimeManager())

                .RegisterType<IOwnerService, OwnerService>(new PerResolveLifetimeManager())
                .RegisterType<IOwnerTranslationService, OwnerTranslationService>(new PerResolveLifetimeManager())

                .RegisterType<INewsService, NewsService>(new PerResolveLifetimeManager())
                .RegisterType<INewsTranslationService, NewsTranslationService>(new PerResolveLifetimeManager())

                .RegisterType<IFeatureService, FeatureService>(new PerResolveLifetimeManager())
                .RegisterType<IFeatureTranslationService, FeatureTranslationService>(new PerResolveLifetimeManager())

               .RegisterType<IUserService, UserService>(new PerResolveLifetimeManager())

               .RegisterType<ICareerService, CareerService>(new PerResolveLifetimeManager())

               .RegisterType<ICareerFormService, CareerFormService>(new PerResolveLifetimeManager())
                .RegisterType<IHotelFeatureService, HotelFeatureService>(new PerResolveLifetimeManager())
                .RegisterType<IHotelReservationService, HotelReservationService>(new PerResolveLifetimeManager())



                .RegisterType<IAboutService, AboutService>(new PerResolveLifetimeManager())
                .RegisterType<IAboutTranslationService, AboutTranslationService>(new PerResolveLifetimeManager())




                .RegisterType<IContactService, ContactService>(new PerResolveLifetimeManager())
                .RegisterType<IContactTranslationService, ContactUsTranslationService>(new PerResolveLifetimeManager())

                .RegisterType<INewsLetterService, NewsLetterService>(new PerResolveLifetimeManager())
                .RegisterType<IConatctFormService, ConatctFormService>(new PerResolveLifetimeManager())

                .RegisterType<IManageStorage, ManageStorage>(new PerResolveLifetimeManager())
                .RegisterType<IFormToMail, FormToMail>(new PerResolveLifetimeManager());
        }

    }
}
