using System;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class TourReservation : Entity
    {
        public long TourReservationId { get; set; }

        [ForeignKey("Tour")]
        public long TourId { get; set; }
        public virtual Tour Tour { get; set; }
         
        public long? UserId { get; set; } 

        public string Address { get; set; }
        public string Note { get; set; } 
        public int Status { get; set; }
        public string TickectNo { get; set; }
        public int TenantId { get; set; } 
         
        public long? SeenUserId { get; set; } 
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
    }
}
