
using System;

namespace Tourista.API.Models
{
    public class TourReservationModel
    {
        public long TourReservationId { get; set; }

        public long TourId { get; set; }
        public virtual TourModel Tour { get; set; }


        public long UserId { get; set; }
        public virtual UserModel User { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }

        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }

        public int Adult { get; set; }
        public int Child { get; set; }  

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
