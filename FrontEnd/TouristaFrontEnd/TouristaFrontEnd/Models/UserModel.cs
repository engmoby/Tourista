﻿using System; 

namespace Tourista.API.Models
{
    public class UserModel
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
        public int TenantId { get; set; }

        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        
    }
}