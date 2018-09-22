using System;
using System.ComponentModel.DataAnnotations;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class Career : Entity
    {  
        [Key]
        public long CareerId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public bool IsDeleted { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; } 
        public int TenantId { get; set; }
         

    }
}
