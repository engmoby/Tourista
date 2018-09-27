using System;
using System.Collections.Generic; 

namespace Tourista.API.Models
{
    public class AboutModel
    {
        public long AboutId { get; set; }
        public Dictionary<string, string> DescriptionDictionary { get; set; }
        public string VideoUrl { get; set; }

        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }

    }
}