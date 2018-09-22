using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class TourDayTranslation : Entity
    {
        public long TourDayTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; }
        public long TourDayId { get; set; }
        public virtual TourDay TourDay { get; set; } 
    }
}
