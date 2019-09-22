using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class BackageTranslation : Entity
    {
        public long BackageTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; }
        public long BackageId { get; set; }
        public virtual Backage Backage { get; set; } 
    }
}
