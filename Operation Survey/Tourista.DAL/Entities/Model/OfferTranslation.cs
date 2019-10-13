using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class OfferTranslation : Entity
    {
        public long OfferTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; }
        public long OfferId { get; set; }
        public virtual Offer Offer { get; set; } 
    }
}
