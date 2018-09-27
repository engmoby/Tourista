using System; 

namespace Tourista.API.Models
{
    public class CareerFormModel
    {

        public long CareerFormId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }

        public string Message { get; set; }
        public virtual CareerModel Career { get; set; }
        public long CareerId { get; set; }


        public long SeenBy { get; set; }
        public virtual UserModel User { get; set; }

        public DateTime? SeenDate { get; set; }
        public bool? Seen { get; set; }

        public string File { get; set; }
        public bool IsDeleted { get; set; } 
        public int TenantId { get; set; }

        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        
    }
}