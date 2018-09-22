using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class City : Entity
    {
        public City()
        {
            CityTranslations = new List<CityTranslation>();
            // Users = new List<User>();
        }

        public long CityId { get; set; }
        public bool IsStatic { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }

        [ForeignKey("Country")]
        public long CountryId { get; set; }
        public virtual Country Country { get; set; }

        public virtual ICollection<CityTranslation> CityTranslations { get; set; }
        //  public virtual ICollection<User> Users { get; set; }
        public int TenantId { get; set; }
    }
}
