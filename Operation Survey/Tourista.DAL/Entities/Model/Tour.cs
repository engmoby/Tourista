using System;
using System.Collections.Generic;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class Tour : Entity
    {
        public Tour()
        {
            TourTranslations = new List<TourTranslation>(); 
        } 
        public long TourId { get; set; }
        public DateTime? StartFrom { get; set; }
        public DateTime? StartTo { get; set; }
        public int Duration { get; set; }
        public int MekkaDays { get; set; }
        public int MadinaDays { get; set; }
        public decimal Price { get; set; }
        public string HotelTitle { get; set; }
        public int UserId { get; set; }

        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }

        public virtual ICollection<TourTranslation> TourTranslations { get; set; } 
        public int TenantId { get; set; }

        public long CurrencyId { get; set; }
        public virtual Currency Currency { get; set; }
    }
}
