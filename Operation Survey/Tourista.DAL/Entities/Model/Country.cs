using System;
using System.Collections.Generic;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class Country : Entity
    {
        public Country()
        {
            CountryTranslations = new List<CountryTranslation>();
            Cityes = new List<City>();
        }
        public long CountryId { get; set; } 
        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }

        public virtual ICollection<CountryTranslation> CountryTranslations { get; set; }
        public virtual ICollection<City> Cityes { get; set; }
        public int TenantId { get; set; }
    }
}
