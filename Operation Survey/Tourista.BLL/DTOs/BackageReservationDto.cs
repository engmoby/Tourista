﻿
using System;
using System.Collections.Generic;
using Tourista.Common;

namespace Tourista.BLL.DTOs
{
    public class BackageReservationDto
    {
        public long BackageReservationId { get; set; }
         
        public long BackageId { get; set; }
        public virtual BackageDto Backage { get; set; }
         
        public long UserId { get; set; }
        public virtual UserDto User { get; set; }

        public string Address { get; set; }
        public string Note { get; set; }
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