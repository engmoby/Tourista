using System;
using System.Collections.Generic;
using Tourista.Common;

namespace Tourista.BLL.DTOs
{
    public class UserDto
    {
        public long UserId { get; set; }
        public string FullName { get; set; }  
        public string Email { get; set; } 
        public string Password { get; set; }  

        public string Title { get; set; }
        public string Phone { get; set; }
        public string Phone2 { get; set; }
        public string WhatsApp { get; set; }
        public bool IsSystemUser { get; set; }
        public Guid UserAccountId { get; set; }

        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public Enums.UserType UserType { get; set; }
        public int TenantId { get; set; }

        public List<long> PermissionId { get; set; }

        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }
    }
}
