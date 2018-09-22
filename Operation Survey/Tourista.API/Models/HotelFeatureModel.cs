namespace Tourista.API.Models
{
    public class HotelFeatureModel
    {
        public long HotelFeatureId { get; set; }
         
        public long HotelId { get; set; }
        public virtual HotelModel Hotel { get; set; }
         
        public long FeatureId { get; set; }
        public virtual FeatureModel Feature { get; set; }

    }
}