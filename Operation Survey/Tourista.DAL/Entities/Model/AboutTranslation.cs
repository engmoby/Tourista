using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class AboutTranslation : Entity
    {
        public long AboutTranslationId { get; set; }
        public string Language { get; set; }
        public string Description { get; set; } 
        public long AboutId { get; set; }
        public virtual About About { get; set; } 
    }
}
