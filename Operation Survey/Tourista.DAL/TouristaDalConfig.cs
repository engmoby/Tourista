using Tourista.DAL.Entities;
using Tourista.DAL.Entities.Model;
using Microsoft.Practices.Unity;
using Repository.Pattern.DataContext;
using Repository.Pattern.Ef6;
using Repository.Pattern.Ef6.Factories;
using Repository.Pattern.Repositories;
using Repository.Pattern.UnitOfWork;
namespace Tourista.DAL
{
    public static class TouristaDalConfig
    {
        public static void RegisterTypes(IUnityContainer container)
        {
            container
                .RegisterType<IDataContextAsync, TouristaContext>(new PerResolveLifetimeManager())
                .RegisterType<IUnitOfWorkAsync, UnitOfWork>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryProvider, RepositoryProvider>(
                    new PerResolveLifetimeManager(),
                    new InjectionConstructor(new object[] { new RepositoryFactories() })
                )
                .RegisterType<IRepositoryAsync<About>, Repository<About>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<AboutTranslation>, Repository<AboutTranslation>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Country>, Repository<Country>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<CountryTranslation>, Repository<CountryTranslation>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<City>, Repository<City>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<CityTranslation>, Repository<CityTranslation>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Currency>, Repository<Currency>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<CurrencyTranslation>, Repository<CurrencyTranslation>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Feature>, Repository<Feature>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<FeatureTranslation>, Repository<FeatureTranslation>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Owner>, Repository<Owner>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<OwnerTranslation>, Repository<OwnerTranslation>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<News>, Repository<News>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<NewsTranslation>, Repository<NewsTranslation>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Hotel>, Repository<Hotel>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<HotelTranslation>, Repository<HotelTranslation>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<HotelFeature>, Repository<HotelFeature>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Tour>, Repository<Tour>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<TourTranslation>, Repository<TourTranslation>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<User>, Repository<User>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Career>, Repository<Career>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<CareerForm>, Repository<CareerForm>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<HotelReservation>, Repository<HotelReservation>>(new PerResolveLifetimeManager())


                 .RegisterType<IRepositoryAsync<About>, Repository<About>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<AboutTranslation>, Repository<AboutTranslation>>(new PerResolveLifetimeManager())


                 .RegisterType<IRepositoryAsync<ContactUs>, Repository<ContactUs>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<ContactUsTranslation>, Repository<ContactUsTranslation>>(new PerResolveLifetimeManager())
                
                //.RegisterType<IRepositoryAsync<TourReservation>, Repository<tour>>(new PerResolveLifetimeManager())

                ;


        }

    }
}
