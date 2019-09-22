using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class TypeTranslation : Entity
    {
        public long TypeTranslationId { get; set; }
        public string Language { get; set; } 
        public string Title { get; set; }
        public long TypeId { get; set; }
        public virtual Type Type { get; set; }
        
    }
}
