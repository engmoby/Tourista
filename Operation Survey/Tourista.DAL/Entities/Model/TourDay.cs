using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class TourDay : Entity
    {
        public TourDay()
        { 
            TourTranslations = new List<TourTranslation>();
        }
        public long TourDayId { get; set; }
        public int Day { get; set; }
        public string Image { get; set; }  
        [ForeignKey("Tour")]
        public long TourId { get; set; }
        public virtual Tour Tour { get; set; }
        public virtual ICollection<TourTranslation> TourTranslations { get; set; }

        public int TenantId { get; set; }
    }
}
