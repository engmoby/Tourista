using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class NewsTranslation : Entity
    {
        public long NewsTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; }
        public long NewsId { get; set; }
        public virtual News News { get; set; }
        
    }
}
