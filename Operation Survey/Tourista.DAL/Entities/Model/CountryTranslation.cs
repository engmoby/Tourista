using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class CountryTranslation : Entity
    {
        public long CountryTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public long CountryId { get; set; }
        public virtual Country Country { get; set; }
        
    }
}
