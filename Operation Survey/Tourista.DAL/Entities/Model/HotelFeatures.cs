using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class HotelFeature : Entity
    {
    
        public long HotelFeatureId { get; set; }

        [ForeignKey("Hotel")]
        public long HotelId { get; set; }
        public virtual Hotel Hotel { get; set; }

        [ForeignKey("Feature")]
        public long FeatureId { get; set; }
        public virtual Feature Feature { get; set; }
        public int TenantId { get; set; }
    }
}
