using System;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class NewsLetter : Entity
    {
        public long NewsLetterId { get; set; }
        public string Email { get; set; }
        [ForeignKey("SeenUser")]
        public long? SeenUserId { get; set; }
        public virtual User SeenUser { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
    }
}
