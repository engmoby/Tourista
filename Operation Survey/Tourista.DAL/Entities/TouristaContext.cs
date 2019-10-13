using System.Data.Entity;
using Tourista.DAL.Entities.Model;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities
{
    public class TouristaContext : DataContext
    { 
        public DbSet<User> Users { get; set; }
        public DbSet<Career> Careers { get; set; }
        public DbSet<CareerForm> CareerForms { get; set; }

        public DbSet<About> Abouts { get; set; }
        public DbSet<AboutTranslation> AboutTranslations { get; set; }
         
        public DbSet<Country> Countries { get; set; }
        public DbSet<CountryTranslation> CountryTranslations { get; set; }

        public DbSet<City> Cities { get; set; }
        public DbSet<CityTranslation> CityTranslations { get; set; }

        public DbSet<ContactUs> Contact { get; set; }
        public DbSet<ContactUsTranslation> ContactUsTranslations { get; set; }

        public DbSet<Currency> Currencies { get; set; }
        public DbSet<CurrencyTranslation> CurrencyTranslations { get; set; }


        public DbSet<Feature> Featureses { get; set; }
        public DbSet<FeatureTranslation> FeaturesTranslations { get; set; }

        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<HotelTranslation> HotelTranslations { get; set; }

        public DbSet<HotelFeature> HotelFeatureses { get; set; } 

        public DbSet<HotelReservation> HotelReservations { get; set; }
        public DbSet<Backage> Backages { get; set; }
        public DbSet<BackageTranslation> BackageTranslations { get; set; }
        public DbSet<BackageReservation> BackageReservations { get; set; }

        public DbSet<Offer> Offers { get; set; }
        public DbSet<OfferTranslation> OfferTranslations { get; set; } 

        public DbSet<OfferReservation> OfferReservations { get; set; }
        public DbSet<News> Newses { get; set; }
        public DbSet<NewsTranslation> NewsTranslations { get; set; }

        public DbSet<Owner> Owners { get; set; }
        public DbSet<OwnerTranslation> OwnerTranslations { get; set; }

        public DbSet<Type> Types { get; set; }
        public DbSet<TypeTranslation> TypeTranslations { get; set; }

        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<RoomTypeTranslation> RoomTypeTranslations { get; set; }

        public DbSet<TourDay> TourDays { get; set; }
        public DbSet<TourDayTranslation> TourDayTranslations { get; set; }

        public DbSet<Tour> Tours { get; set; }
        public DbSet<TourTranslation> TourTranslations { get; set; }
        public DbSet<NewsLetter> NewsLetters { get; set; } 
        public DbSet<Inquery> Inqueries { get; set; }

        // public DbSet<TourFeature> TourFeatures { get; set; } 


        public TouristaContext() : base("name=TouristaDB")
        {
            Database.SetInitializer<TouristaContext>(null);
        }
    }
}
