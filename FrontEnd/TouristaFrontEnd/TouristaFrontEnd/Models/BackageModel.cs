using System;
using System.Collections.Generic;

namespace Tourista.API.Models
{
    public class BackageModel
    {
        public long BackageId { get; set; }
        public Dictionary<string, string> TitleDictionary { get; set; }
        public Dictionary<string, string> DescriptionDictionary { get; set; }

        public int Star { get; set; }
        public List<string> ImagesURL { get; set; }
        public List<int> RemoveImages { get; set; }
        public long CityId { get; set; }

        public int DaysCount { get; set; }
        public int NigthsCount { get; set; }
        public string Price { get; set; }
        public string HotelTitle { get; set; }

        public long? HotelId { get; set; }
        public virtual HotelModel Hotel { get; set; }
        public long? TypeId { get; set; }
        public virtual TypeModel Type { get; set; }


        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }
        public CityModel City { get; set; }
    }
}
