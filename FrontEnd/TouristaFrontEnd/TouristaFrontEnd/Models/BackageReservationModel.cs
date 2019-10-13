
using System;

namespace Tourista.API.Models
{
    public class BackageReservationModel
    {
        public long BackageReservationId { get; set; }

        public long BackageId { get; set; }
        public virtual BackageModel Backage { get; set; }


        public long UserId { get; set; }
        public virtual UserModel User { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }

        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }

        public int Adult { get; set; }
        public int Child { get; set; } 
        public int RoomCount { get; set; }

        public string TickectNo { get; set; }
        public int TenantId { get; set; }
        public long SeenUserId { get; set; }
        public virtual UserModel SeenUser { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public string FullName { get; internal set; }
        public string Email { get; internal set; }
        public string PhoneNo { get; internal set; }
    }
}
