using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class Feature : Entity
    {

        public Feature()
        {
            HotelFeature = new List<HotelFeature>();
            FeaturesTranslations = new List<FeatureTranslation>();
        }
        [Key]
        public long FeatureId { get; set; }
        public string Icon { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }
        public virtual ICollection<HotelFeature> HotelFeature { get; set; }
        public virtual ICollection<FeatureTranslation> FeaturesTranslations { get; set; }
        public int TenantId { get; set; }
    }
}
