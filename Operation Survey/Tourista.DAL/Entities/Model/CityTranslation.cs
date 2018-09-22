using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class CityTranslation : Entity
    {
        public long CityTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public long CityId { get; set; }
        public virtual City City { get; set; }
        
    }
}
