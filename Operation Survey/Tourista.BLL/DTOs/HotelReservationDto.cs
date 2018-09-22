
using System;
using System.Collections.Generic;
using Tourista.Common;

namespace Tourista.BLL.DTOs
{
    public class HotelReservationDto
    {
        public long HotelReservationId { get; set; }
         
        public long HotelId { get; set; }
        public virtual HotelDto Hotel { get; set; }
         
        public long UserId { get; set; }
        public virtual UserDto User { get; set; }

        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }

        public int Adult { get; set; }
        public int Child { get; set; }
        public Enums.Status Status { get; set; }
        public int RoomCount { get; set; }

        public long SeenUserId { get; set; }
        public virtual UserDto SeenUser { get; set; }
        public string TickectNo { get; set; }
        public int TenantId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
    }
}
