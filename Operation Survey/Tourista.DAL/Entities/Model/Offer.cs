using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class Offer : Entity
    {
        public Offer()
        {
            OfferTranslations = new List<OfferTranslation>();
        }
        public long OfferId { get; set; }


        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int Star { get; set; }
        public int DaysCount { get; set; }
        public int NigthsCount { get; set; }
        public string PriceBefore { get; set; }
        public string Price { get; set; }
        public string HotelTitle { get; set; }

        public long? HotelId { get; set; }
        public virtual Hotel Hotel{ get; set; }
        public long? TypeId { get; set; }
        public virtual Type Type { get; set; }
        public long? CityId { get; set; }
        public virtual City City { get; set; }
        public virtual ICollection<OfferTranslation> OfferTranslations { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }
        public int TenantId { get; set; }
        [ForeignKey("User")]
        public long? UserId { get; set; }
        public User User { get; set; }

        public long CurrencyId { get; set; }
        public virtual Currency Currency { get; set; }
    }
}
