using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;
using System.ComponentModel.DataAnnotations;

namespace Tourista.DAL.Entities.Model
{
    public class TourFeature : Entity
    { 
        public long TourFeatureId { get; set; }

        [ForeignKey("Tour")]
        public long TourId { get; set; }
        public virtual Tour Tour { get; set; }

        [ForeignKey("Feature")]
        public long FeatureId { get; set; }
        public virtual Feature Feature { get; set; }
        public int TenantId { get; set; }
    }
}
