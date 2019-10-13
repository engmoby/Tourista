using System;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class BackageReservation : Entity
    {
        public long BackageReservationId { get; set; }

        [ForeignKey("Backage")]
        public long BackageId { get; set; }
        public virtual Backage Backage { get; set; }

        //[ForeignKey("User")]
        public long? UserId { get; set; }
        //public virtual User User { get; set; }

        public string Address { get; set; }
        public string Note { get; set; }
        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }

        public int? Adult { get; set; }
        public int? Child { get; set; }
        public int Status { get; set; }
        public string TickectNo { get; set; }
        public int TenantId { get; set; }
        public int? RoomCount { get; set; }


        //[ForeignKey("SeenUser")]
        public long? SeenUserId { get; set; }
        //public virtual User SeenUser { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
    }
}
