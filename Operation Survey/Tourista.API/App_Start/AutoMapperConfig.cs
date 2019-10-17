using System;
using AutoMapper.Configuration;
using Tourista.API.Models;
using Tourista.BLL;
using Tourista.BLL.DTOs;
using Tourista.Common;
using Tourista.DAL.Entities.Model;

namespace Tourista.API
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {

            var mapperConfiguration = new MapperConfigurationExpression();

            mapperConfiguration.CreateMap<UserModel, UserDto>();
            mapperConfiguration.CreateMap<UserDto, UserModel>();


            mapperConfiguration.CreateMap<CareerModel, CareerDto>();
            mapperConfiguration.CreateMap<CareerDto, CareerModel>();

            mapperConfiguration.CreateMap<CareerFormModel, CareerFormDto>();
            mapperConfiguration.CreateMap<CareerFormDto, CareerFormModel>();

            mapperConfiguration.CreateMap<CountryModel, CountryDto>();
            mapperConfiguration.CreateMap<CountryDto, CountryModel>();

            mapperConfiguration.CreateMap<CityModel, CityDto>();
            mapperConfiguration.CreateMap<CityDto, CityModel>();
             
            mapperConfiguration.CreateMap<CurrencyModel, CurrencyDto>();
            mapperConfiguration.CreateMap<CurrencyDto, CurrencyModel>();
             
            mapperConfiguration.CreateMap<OwnerModel, OwnerDto>();
            mapperConfiguration.CreateMap<OwnerDto, OwnerModel>();
             
            mapperConfiguration.CreateMap<NewsModel, NewsDto>();
            mapperConfiguration.CreateMap<NewsDto, NewsModel>();

            mapperConfiguration.CreateMap<FeatureModel, FeatureDto>();
            mapperConfiguration.CreateMap<FeatureDto, FeatureModel>();

            mapperConfiguration.CreateMap<BackageModel, BackageDto>();
            mapperConfiguration.CreateMap<BackageDto, BackageModel>();

            mapperConfiguration.CreateMap<BackageReservationModel, BackageReservationDto>();
            mapperConfiguration.CreateMap<BackageReservationDto, BackageReservationModel>();


            mapperConfiguration.CreateMap<OfferModel, OfferDto>();
            mapperConfiguration.CreateMap<OfferDto, OfferModel>();


            mapperConfiguration.CreateMap<TourModel, TourDto>();
            mapperConfiguration.CreateMap<TourDto, TourModel>();
            mapperConfiguration.CreateMap<TourReservationModel, TourReservationDto>();
            mapperConfiguration.CreateMap<TourReservationDto, TourReservationModel>();


            mapperConfiguration.CreateMap<OfferReservationModel, OfferReservationDto>();
            mapperConfiguration.CreateMap<OfferReservationDto, OfferReservationModel>();

            mapperConfiguration.CreateMap<HotelModel, HotelDto>();
            mapperConfiguration.CreateMap<HotelDto, HotelModel>();

            mapperConfiguration.CreateMap<HotelFeatureModel, HotelFeatureDto>();
            mapperConfiguration.CreateMap<HotelFeatureDto, HotelFeatureModel>();

            mapperConfiguration.CreateMap<HotelReservationModel, HotelReservationDto>();
            mapperConfiguration.CreateMap<HotelReservationDto, HotelReservationModel>();



            mapperConfiguration.CreateMap<TypeModel, TypeDto>();
            mapperConfiguration.CreateMap<TypeDto, TypeModel>();



            mapperConfiguration.CreateMap<AboutModel, AboutDto>();
            mapperConfiguration.CreateMap<AboutDto, AboutModel>();



            mapperConfiguration.CreateMap<ContactModel, ContactDto>();
            mapperConfiguration.CreateMap<ContactDto, ContactModel>();


            mapperConfiguration.CreateMap<NewsLetterModel, NewsLetterDto>();
            mapperConfiguration.CreateMap<NewsLetterDto, NewsLetterModel>();


            mapperConfiguration.CreateMap<ContactFormModel, ContactFormDto>();
            mapperConfiguration.CreateMap<ContactFormDto, ContactFormModel>();


            //mapperConfiguration.CreateMap<AdminModel, AdminDto>();
            //mapperConfiguration.CreateMap<UserConsumed, UserConsumedModel>();

            TouristaBllConfig.RegisterMappings(mapperConfiguration); 

        }
    }
}