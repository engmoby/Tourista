using System;
using System.Collections.Generic;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class About : Entity
    {
        public About()
        {
            AboutTranslations = new List<AboutTranslation>(); 
        }
        public string VideoUrl { get; set; }    
        public long AboutId { get; set; }  
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; } 

        public virtual ICollection<AboutTranslation> AboutTranslations { get; set; } 
        public int TenantId { get; set; }
    }
}
