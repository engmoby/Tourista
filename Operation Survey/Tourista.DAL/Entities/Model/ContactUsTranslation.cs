using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class ContactUsTranslation : Entity
    {
        public long ContactUsTranslationId { get; set; }
        public string Language { get; set; }
        public string Address { get; set; } 
        public long ContactUsId { get; set; }
        public virtual ContactUs ContactUs { get; set; }
        
    }
}
