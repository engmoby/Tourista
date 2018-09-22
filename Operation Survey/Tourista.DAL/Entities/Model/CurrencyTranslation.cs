using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class CurrencyTranslation : Entity
    {
        public long CurrencyTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public long CurrencyId { get; set; }
        public virtual Currency Currency { get; set; }
        
    }
}
