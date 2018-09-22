using System;
using System.Collections.Generic;
using System.IO;

namespace Tourista.BLL.DTOs
{
    public class NewsDto
    {
        public long NewsId { get; set; }
        public Dictionary<string, string> TitleDictionary { get; set; }
        public Dictionary<string, string> DescriptionDictionary { get; set; }
        public MemoryStream ImageStream { get; set; }   
         
       public string Image { get; set; } 
        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; } 
    }
}

