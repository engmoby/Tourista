using System;
using System.Collections.Generic;

namespace Tourista.BLL.DTOs
{
    public class TypeDto
    {
        public long TypeId { get; set; }
        public Dictionary<string, string> TitleDictionary { get; set; }
        public long CountryId { get; set; }
         
        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }
    }
}

