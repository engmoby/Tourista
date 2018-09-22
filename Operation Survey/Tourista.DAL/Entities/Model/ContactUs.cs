using System;
using System.Collections.Generic;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class ContactUs : Entity
    {
        public ContactUs()
        {
            ContactUsTranslations = new List<ContactUsTranslation>(); 
        }
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

        public virtual ICollection<ContactUsTranslation> ContactUsTranslations { get; set; } 
        public int TenantId { get; set; }
    }
}
