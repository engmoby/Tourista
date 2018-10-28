using System;
using System.Collections.Generic; 
namespace Tourista.API.Models
{
    public class ContactModel
    {
        public Dictionary<string, string> AddressDictionary { get; set; }
        public long ContactUsId { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Facebook { get; set; }
        public string Instgram { get; set; }
        public string Twitter { get; set; }
        public string LinkedIn { get; set; }
        public string Mail { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }

    }
}