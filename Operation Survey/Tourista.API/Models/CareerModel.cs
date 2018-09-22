﻿using System;
using Tourista.Common;

namespace Tourista.API.Models
{
    public class CareerModel
    {
        public long CareerId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public bool IsDeleted { get; set; } 
        public int TenantId { get; set; }

        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        
    }
}