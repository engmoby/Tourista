using Microsoft.Practices.Unity;
using System;
using System.Web.Http;
using Tourista.BLL;
using Tourista.BLL.Services;
using Tourista.BLL.Services.Interfaces;
using Unity.WebApi;

namespace Tourista.API
{
    public class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            ApplyMapping(container, true);
            return container;
        });

        /// <summary>
        /// Gets the configured Unity container.
        /// </summary>
        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }
        #endregion

        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>There is no need to register concrete types such as controllers or API controllers (unless you want to 
        /// change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.</remarks>
        public static void RegisterTypes(HttpConfiguration config)
        {
            // NOTE: To load from web.config uncomment the line below. Make sure to add a Microsoft.Practices.Unity.Configuration to the using statements.
            // container.LoadConfiguration();
            var container = new UnityContainer();

            // TODO: Register your types here

            ApplyMapping(container, false);


            //GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver =
                config.DependencyResolver = new UnityDependencyResolver(container);


        }

        public static void ApplyMapping(IUnityContainer container, bool applyDependencyResolver)
        {
            container 
                .RegisterType<IUserFacade, UserFacade>(new PerResolveLifetimeManager())
                .RegisterType<ICareerFacade, CareerFacade>(new PerResolveLifetimeManager())
                .RegisterType<ICareerFormFacade, CareerFormFacade>(new PerResolveLifetimeManager())
                .RegisterType<ICountryFacade, CountryFacade>(new PerResolveLifetimeManager()) 
                .RegisterType<ICityFacade, CityFacade>(new PerResolveLifetimeManager()) 
                .RegisterType<ICurrencyFacade, CurrencyFacade>(new PerResolveLifetimeManager())
                .RegisterType<IFeatureFacade, FeatureFacade>(new PerResolveLifetimeManager())
                .RegisterType<INewsFacade, NewsFacade>(new PerResolveLifetimeManager())
                .RegisterType<IOwnerFacade, OwnerFacade>(new PerResolveLifetimeManager())
                .RegisterType<IHotelFacade, HotelFacade>(new PerResolveLifetimeManager())
                .RegisterType<IHotelReservationFacade, HotelReservationFacade>(new PerResolveLifetimeManager())
                
                
                .RegisterType<IAboutFacade, AboutFacade>(new PerResolveLifetimeManager())
                
                .RegisterType<IContactFacade, ContactFacade>(new PerResolveLifetimeManager())

                .RegisterType<INewsletterFacade, NewsletterFacade>(new PerResolveLifetimeManager()) 
                .RegisterType<IConatctFormFacade, ConatctFormFacade>(new PerResolveLifetimeManager())

                ;

            TouristaBllConfig.RegisterTypes(container);
            if (applyDependencyResolver)
                GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);


        }
    }
}