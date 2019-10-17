using System;
using System.Collections.Generic;

namespace Tourista.API.Models
{
    public class TourModel
    {
        public long TourId { get; set; }
        public Dictionary<string, string> TitleDictionary { get; set; }
        public Dictionary<string, string> DescriptionDictionary { get; set; }

        public DateTime? StartFrom { get; set; }
        public DateTime? StartTo { get; set; }
        public int Duration { get; set; }
        public int MekkaDays { get; set; }
        public int MadinaDays { get; set; }
        public decimal Price { get; set; }
        public string HotelTitle { get; set; }
        public List<string> ImagesURL { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; } 
    }
}
