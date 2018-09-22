using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class OwnerTranslation : Entity
    {
        public long OwnerTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public string Postion { get; set; }
        public string Description { get; set; }
        public long OwnerId { get; set; }
        public virtual Owner Owner { get; set; }
        
    }
}
