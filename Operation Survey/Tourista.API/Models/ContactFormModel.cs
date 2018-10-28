using System;
using Tourista.Common;

namespace Tourista.API.Models
{
    public class ContactFormModel
    {

        public long InqueryId { get; set; }
        public string UserName { get; set; }
        public string Message { get; set; }
        public string Email { get; set; }
        public long? SeenUserId { get; set; }
        public virtual UserModel SeenUser { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }

    }
}