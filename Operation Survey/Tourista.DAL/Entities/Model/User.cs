using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;
using Tourista.Common;

namespace Tourista.DAL.Entities.Model
{
    public class User : Entity
    { 

        [Key]
        public long UserId { get; set; } 
        public Guid UserAccountId { get; set; }

        [Required]
        public string FullName { get; set; }
        
        [Required]
        public string Email { get; set; }

        public string Password { get; set; }
        public string Title { get; set; }

        [Required]
        public string Phone { get; set; }  
        public string Phone2 { get; set; }
        public string WhatsApp { get; set; }
        public bool IsSystemUser { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }
         
         
        public int UserType { get; set; }
        public int TenantId { get; set; }
         

    }
}
