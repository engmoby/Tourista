using System;
using System.Collections.Generic;
using Tourista.Common;

namespace Tourista.BLL.DTOs
{
    public class AboutDto
    {
        public long AboutId { get; set; } 
        public Dictionary<string, string> DescriptionDictionary { get; set; }
        public string VideoUrl { get; set; }
         
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; } 
    }
}
