using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class CareerForm : Entity
    {  
        [Key]
        public long CareerFormId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }

        public string Message { get; set; }
        [ForeignKey("Career")]
        public long CareerId { get; set; }
        public virtual Career Career { get; set; }

        public long SeenBy { get; set; }
        public virtual User User { get; set; }
         
        public DateTime? SeenDate { get; set; }
        public bool? Seen { get; set; }
        public string File { get; set; }

        public bool IsDeleted { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; } 
        public int TenantId { get; set; }
         

    }
}
