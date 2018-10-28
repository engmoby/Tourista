﻿using System;
using System.Collections.Generic;

namespace Tourista.BLL.DTOs
{
    public class ContactFormDto
    {
        public long InqueryId { get; set; } 
        public string UserName { get; set; }
        public string Message { get; set; }
        public string Email { get; set; } 
        public long? SeenUserId { get; set; }
        public virtual UserDto SeenUser { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
    }
}

