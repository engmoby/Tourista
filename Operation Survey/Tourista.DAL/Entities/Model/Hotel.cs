using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class Hotel : Entity
    {
        public Hotel()
        {
            HotelFeature = new List<HotelFeature>();
            HotelTranslations = new List<HotelTranslation>();
        }
        public long HotelId { get; set; }
        public int Star { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public long CityId { get; set; }
        public virtual City City { get; set; }
        public virtual ICollection<HotelTranslation> HotelTranslations { get; set; }
        public virtual ICollection<HotelFeature> HotelFeature { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }
        public int TenantId { get; set; }
        [ForeignKey("User")]
        public long? UserId { get; set; }
        public User User { get; set; }
    }
}
