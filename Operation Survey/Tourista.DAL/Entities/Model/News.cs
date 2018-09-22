using System;
using System.Collections.Generic;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class News : Entity
    {
        public News()
        {
            NewsTranslations = new List<NewsTranslation>(); 
        }
        public long NewsId { get; set; } 
        public bool IsDeleted { get; set; }
        public string Image { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }

        public virtual ICollection<NewsTranslation> NewsTranslations { get; set; } 
        public int TenantId { get; set; }
    }
}
