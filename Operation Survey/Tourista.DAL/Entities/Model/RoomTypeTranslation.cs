using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class RoomTypeTranslation : Entity
    {
        public long RoomTypeTranslationId { get; set; }
        public string Language { get; set; } 
        public long RoomTypeId { get; set; }
        public virtual RoomType RoomType { get; set; }
        
    }
}
