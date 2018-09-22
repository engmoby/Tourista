using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class HotelTranslation : Entity
    {
        public long HotelTranslationId { get; set; }
        public string Language { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; }
        public long HotelId { get; set; }
        public virtual Hotel Hotel { get; set; } 
    }
}
