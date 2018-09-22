using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class TourTranslation : Entity
    {
        public long TourTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; }
        public long TourId { get; set; }
        public virtual Tour Tour { get; set; } 
    }
}
